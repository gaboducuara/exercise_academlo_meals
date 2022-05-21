// Models
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
    },
  });

  if (!meal) {
    return next(new AppError(404, 'Meal does not exist whit the giver Id'));
  }

  const totalPrice = meal.price * quantity;

  const newOrder = await Order.create({
    quantity,
    totalPrice,
    mealId,
    userId: sessionUser.id,
  });

  res.status(201).json({
    newOrder,
  });
});

const getOrdersByUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: {
      userId: sessionUser.id,
      status: 'active',
    },
    include: [
      {
        model: Meal,
        include: [{ model: Restaurant }],
        attributes: {
          exclude: ['mealId'],
        },
      },
    ],
  });

  res.status(200).json({
    orders,
  });
});

const getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const order = await Order.findOne({
    where: {
      id,
      userId: sessionUser.id,
      status: 'active',
    },
    include: [
      {
        model: Meal,
        include: [
          {
            model: Restaurant,
          },
        ],
        attributes: {
          exclude: ['mealId'],
        },
      },
    ],
  });

  if (!order) {
    return next(new AppError('Order does not exist with the given Id', 404));
  }

  res.status(200).json({
    order,
  });
});

const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({
    status: 'completed',
  });

  res.status(200).json({
    status: 'success',
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({
    status: 'delete',
  });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrder,
  deleteOrder,
};