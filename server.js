// Core modules
// const heapdump = require('heapdump');

// 3rd party modules
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Routes
const propertiesRoutes = require('./routes/propertyRoute');
const reservationsRoutes = require('./routes/reservationRoute');
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');
const messagesRoutes = require('./routes/messageRoute');

// Error handling
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

// Load env variables
dotenv.config();

// Express app
const app = express();

// Heapdump
// heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');

// Compression middleware
app.use(require('compression')());

// Database connection
require('./config/db')();

// Body parser middleware
app.use(express.json({limit: '30kb'}));

// Dev logging middleware
if (process.env.NODE_ENV === 'Development') {
  app.use(morgan('dev'));
};

// Data sanitization against NoSQL query injection
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());

// Rate limiting middleware
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour'
});
app.use('/api', limiter);

// Mount Routes
app.use('/api/v1/properties', propertiesRoutes);
app.use('/api/v1/reservations', reservationsRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/messages', messagesRoutes);

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
    console.log(`server (${process.env.NODE_ENV} Mode) listening at http://localhost:${port}`)
});

// Events => Event Loop => Callback Queue => Event Loop => Event Handler
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err);
  process.exit(1);
});