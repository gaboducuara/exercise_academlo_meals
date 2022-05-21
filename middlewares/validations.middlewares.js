const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError');

const createUserValidations = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isString()
    .withMessage('Name must be a string'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

const createRestaurantValidations = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isString()
    .withMessage('Name must be a string'),
  body('address')
    .notEmpty()
    .withMessage('Address cannot be empty')
    .isString()
    .withMessage('Address must be a string'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty')
    .isNumeric()
    .withMessage('Rating must be a number')
    .custom(value => value >= 1 && value <= 5)
    .withMessage('Rating must be between 1 and 5'),
];

const createReviewValidations = [
  body('comment')
    .notEmpty()
    .withMessage('Comment cannot be empty')
    .isString()
    .withMessage('Comment must be a string'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty')
    .isNumeric()
    .withMessage('Rating must be a number')
    .custom(value => value >= 1 && value <= 5)
    .withMessage('Rating must be between 1 and 5'),
];

const createMealValidations = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isString()
    .withMessage('Name must be a string'),
  body('price')
    .notEmpty()
    .withMessage('Price cannot be empty')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom(value => value >= 1)
    .withMessage('Price must be greater than 1'),
];

const createOrderValidations = [
  body('quantity')
    .notEmpty()
    .withMessage('Quantity cannot be empty')
    .isNumeric()
    .withMessage('Quantity must be a number'),
  body('mealId')
    .notEmpty()
    .withMessage('Meal cannot be empty')
    .isNumeric()
    .withMessage('Meal must be a number'),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    // [msg, msg, msg] -> 'msg. msg. msg'
    const errorMsg = messages.join('. ');

    return next(new AppError(400, errorMsg));
  }

  next();
};

module.exports = {
  createUserValidations,
  createRestaurantValidations,
  createReviewValidations,
  createMealValidations,
  createOrderValidations,
  checkValidations,
};