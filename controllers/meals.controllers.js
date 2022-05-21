// Models
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');

const createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { restaurant } = req;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: restaurant.id,
  });

  newMeal.mealId = undefined;
  newMeal.orderId = undefined;

  res.status(201).json({
    newMeal,
  });
});

const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
    include: [{ model: Restaurant }],
    attributes: {
      exclude: ['orderId', 'mealId'],
    },
  });

  res.status(200).json({
    meals,
  });
});

const getMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(200).json({
    meal,
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const data = filterObj(req.body, 'name', 'price');

  await meal.update({ ...data });

  res.status(200).json({ status: 'success' });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({
    status: 'deleted',
  });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};