// Models
const { Review } = require('../models/review.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');

const createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { restaurant } = req;
  const { sessionUser } = req;

  const newReview = await Review.create({
    comment,
    rating,
    restaurantId: restaurant.id,
    userId: sessionUser.id,
  });

  res.status(201).json({
    newReview,
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const data = filterObj(req.body, 'comment', 'rating');

  await review.update({
    ...data,
  });

  res.status(200).json({
    status: 'success',
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({
    status: 'deleted',
  });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = { createReview, updateReview, deleteReview };