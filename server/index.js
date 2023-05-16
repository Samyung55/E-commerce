const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const csurf = require('csurf');
const mongoose = require('mongoose')
const cors = require('cors');

const dbConnection = require('./db')
const AppError = require('./utils/AppError')

const errorHandler = require('./middleware/error')

const authRoutes = require('./routes/auth')

const connect = async () => {
    try {
        await mongoose.connect(process.env.URL)
        console.log("connected to mongodb")
    }
    catch (error) {
        console.error(error)
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected")
})
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173'
  }));
  
const csurfProtection = csurf({
    cookie: true
})



app.get('/csrf-token', (req, res) => {
    res.json({ csurfToken: req.csurfToken()})
})
app.use(csurfProtection)
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${reg.originalUrl} on this server!`, 404))
})

const PORT = 4000;

app.listen(PORT, () => {
    connect()
  console.log(`Server is running on port ${PORT}`);
});

