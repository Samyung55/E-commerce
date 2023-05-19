const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require("serverless-http")

const productRoutes = require('./routes/product')
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/error');
const authRoutes = require('./routes/auth');

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

app.use('/.netlify/functions/api/auth', authRoutes);
app.use('/.netlify/functions/api', productRoutes);


app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

const PORT = 4000;

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});


module.exports.handler = serverless(app);