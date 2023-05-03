const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('../models/User')
const AppError = require('../utils/AppError')

const catchAsync  = require('../utils/catchAsync')
const sendEmail = require('../utils/sendEmail')

const signToken = (id, email) => {
    const secret = process.env.JWT_SECRET
    const payload = {
        email,
        id
    }

    return jwt.sign(payload, secret, {expiresIn: '1h'})
}

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id, user.email)
    
    res.cookie('token', token, {httpOnly: true} )

    //remove password
    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

const router = express.Router();

router.post('/login', catchAsync(async (req, res, next) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({ email })

    if(!existingUser) return next(new AppError('Invalid credentials', 400))
    
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if(!isPasswordCorrect) return next(new AppError('Invalid credentials', 400))

    createSendToken(existingUser, 200, req, res)
}))

router.post('/forgotpassword', catchAsync(async (req, res, next) => {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) return next(new AppError('Invalid email', 404))
    
    const resetToken = user.createResetPasswordToken()
    await user.save()

    try {
        const resetUrl = `http://localhost:4000/passwordreset/${resetToken}`

        const message = `
       <h2>You had requested for a password reset</h2>
       <p>Please click the following to reset your password:</p>
       <a href=${resetURL} clicktracking=off>ResetLink</a>
        `
        await sendEmail({
            to: user.email,
            subject: 'Password Reset Request',
            text: message
        })

        res.status(200).json({ success: true, data: 'message sent!'})
    }
    catch (error) {
        console.log(error)
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()

        return next(new AppError('Error sending email, please try again!', 500))
    }
}))

router.post('/resetpassword/:resetToken', catchAsync(async (req, res, next) => {
    const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user) return next(new AppError('Invalid Token', 400))
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(201).json({
        success: true,
        data: "Password Updated",
    })
}))

