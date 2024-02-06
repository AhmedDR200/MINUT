// 3rd party modules
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// Express app
const app = express();

// Body parser middleware
app.use(express.json({limit: '30kb'}));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

// Server connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server (${process.env.NODE_ENV}) listening at http://localhost:${port}`)
});