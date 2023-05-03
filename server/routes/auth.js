import express from 'express'

import { login, register, forgotPassword, resetPassword} from '../controls/auth'

const router = express.Router()

router.post('/login', login)

router.post('/register', register)

router.post('/forgotpassword', forgotPassword)

router.put('/passwordreset/:resetToken', resetPassword)

export default router