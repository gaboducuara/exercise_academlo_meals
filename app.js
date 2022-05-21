const express = require('express');
const rateLimit = require('express-rate-limit');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { restaurantsRouter } = require('./routes/restaurants.routes');
const { mealsRouter } = require('./routes/meals.routes');
const { ordersRouter } = require('./routes/orders.routes');

// Utils
const { AppError } = require('./utils/appError');

// Init express app
const app = express();

// Enable incoming JSON data
app.use(express.json());

// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP',
});

app.use(limiter);

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

// Global error handler
app.use('*', (req, res, next) => {
  return next(
    new AppError(404, `${req.originalUrl} not found in this server.`)
  );
});

app.use(globalErrorHandler);

module.exports = { app };