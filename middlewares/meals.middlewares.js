// Models
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const mealExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [{ model: Restaurant, where: { status: 'active' } }],
    attributes: {
      exclude: ['orderId', 'mealId'],
    },
  });

  if (!meal) {
    return next(new AppError(404, 'Meal does not exist with the given Id'));
  }

  req.meal = meal;

  next();
});

module.exports = { mealExists };