const express = require('express');

// Controllers
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
} = require('../controllers/orders.controllers');

// Middlewares
const {
  createOrderValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');
const { protectToken } = require('../middlewares/auth.middlewares');
const { orderExists } = require('../middlewares/orders.middlewares');
const { protectAccountOwner } = require('../middlewares/users.middlewares');

const router = express.Router();

router.use(protectToken);

router.post('/', createOrderValidations, checkValidations, createOrder);

router.get('/me', getOrdersByUser);

router
  .use('/:id', orderExists)
  .route('/:id')
  .patch(updateOrder)
  .delete(deleteOrder);

module.exports = {
  ordersRouter: router,
};