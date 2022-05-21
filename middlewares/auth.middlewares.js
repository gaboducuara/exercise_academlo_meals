const jwt = require('jsonwebtoken');

// Models
const { User } = require('../models/user.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const protectToken = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;

  let token;

  // Extract token from headers
  if (authorization && authorization.startsWith('Bearer')) {
    // ['Bearer', 'token']
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError(403, 'Session invalid'));
  }

  // Validate token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return next(
      new AppError(403, 'The owner of this token is no longer available')
    );
  }

  req.sessionUser = user;

  next();
});

const protectAdmin = catchAsync(async (req, res, next) => {
  if (req.sessionUser.role !== 'admin') {
    return next(new AppError(403, 'Access not granted'));
  }

  next();
});

module.exports = { protectToken, protectAdmin };