const { Review } = require('../models/review.model');
const { AppError } = require('../utils/appError');

// Utils
const { catchAsync } = require('../utils/catchAsync');

const reviewExists = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await Review.findOne({
    where: {
      id: +reviewId,
      status: 'active',
    },
  });

  if (!review) {
    return next(new AppError(404, 'Review does not exist with the given Id'));
  }

  req.review = review;

  next();
});

module.exports = { reviewExists };