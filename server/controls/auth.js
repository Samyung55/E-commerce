import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from '../models/User'
import AppError from '../utils/AppError'

import { catchAsync } from '../utils/catchAsync'
import sendEmail from '../utils/sendEmail'

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

export const login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email})

    if(!existingUser) return next(new AppError('Invalid credentials', 400))
})