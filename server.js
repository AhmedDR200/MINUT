// 3rd party modules
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Routes
const propertiesRoutes = require('./routes/propertyRoute');
const reservationsRoutes = require('./routes/reservationRoute');

// Error handling
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

// Load env variables
dotenv.config();

// Express app
const app = express();

// Database connection
require('./config/db')();

// Body parser middleware
app.use(express.json({limit: '30kb'}));

// Dev logging middleware
if (process.env.NODE_ENV === 'Development') {
  app.use(morgan('dev'));
};

// Mount Routes
app.use('/properties', propertiesRoutes);
app.use('/reservations', reservationsRoutes);

// 404 Error Handling Middleware
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 400));
});

// Global Error Handling Middleware
app.use(globalError);

// Server connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server (${process.env.NODE_ENV}) listening at http://localhost:${port}`)
});

// Events => Event Loop => Callback Queue => Event Loop => Event Handler
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err);
  process.exit(1);
});