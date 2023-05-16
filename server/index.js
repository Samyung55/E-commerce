const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const mongoose = require('mongoose');
const cors = require('cors');

const dbConnection = require('./db');
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/error');

const connect = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173'
}));

const csrfProtection = csrf({ cookie: true });

app.use('/register', csrfProtection);

// Routes go here
app.use('/register', require('./routes/register')); // Assuming you have a separate file for the '/register' route

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

const PORT = 4000;

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
