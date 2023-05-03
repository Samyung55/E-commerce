const express = require('express')

const { login, register, forgotPassword, resetPassword} = require('../controls/auth')

const router = express.Router()

router.post('/login', login)

router.post('/register', register)

router.post('/forgotpassword', forgotPassword)

router.put('/passwordreset/:resetToken', resetPassword)


module.export = router