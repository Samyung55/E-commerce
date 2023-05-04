const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const csurf = require('csurf');


const dbConnection = require('./db')
const AppError = require('./utils/AppError')

const errorHandler = require('./middleware/error')

const authRoutes = require('./routes/auth')

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

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${reg.originalUrl} on this server!`, 404))
})

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});