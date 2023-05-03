import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import csurf from 'csurf'

import dbConnection from './db'
import AppError from './utils/AppError'

import errorHandler from './middleware/error'

import productRoutes from './routes/products'
import authRoutes from './routes/auth'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

const csurfProtection = csurf({
    cookie: true
})

app.use(csurfProtection)

app.get('/api/csurf-token', (req, res) => {
    res.json({ csurfToken: req.csurfToken()})
})

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${reg.originalUrl} on this server!`, 404))
})