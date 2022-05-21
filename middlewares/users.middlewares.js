const jwt = require('jsonwebtoken');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: 'active' },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return next(new AppError(404, 'User does not exist with the given Id'));
  }

  // Add user data to the req object
  req.user = user;
  next();
});

const protectAccountOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  // Compare the id's
  if (sessionUser.id !== +id) {
    // If the ids aren't equal, return error
    return next(new AppError(403, 'You do not own this account'));
  }

  // If the ids are equal, the request pass
  next();
});

module.exports = {
  userExists,
  protectAccountOwner,
};