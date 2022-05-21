// Models
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    newRestaurant,
  });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
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

  res.status(200).json({
    restaurants,
  });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    restaurant,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const data = filterObj(req.body, 'name', 'address');

  await restaurant.update({
    ...data,
  });

  res.status(200).json({
    status: 'success',
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({
    status: 'deleted',
  });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};