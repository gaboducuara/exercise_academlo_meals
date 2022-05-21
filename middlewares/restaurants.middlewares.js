// Models
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const restaurantExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Review,
        where: {
          status: 'active',
        },
        required: false,
      },
      {
        model: Meal,
        where: {
          status: 'active',
        },
        required: false,
        attributes: {
          exclude: ['orderId', 'mealId'],
        },
      },
    ],
  });

  if (!restaurant) {
    return next(
      new AppError(404, 'Restaurant does not exist with the given Id')
    );
  }

  req.restaurant = restaurant;

  next();
});

module.exports = { restaurantExists };