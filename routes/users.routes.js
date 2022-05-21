const express = require('express');

// Controllers
const {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controllers/users.controllers');

const {
  getOrderById,
  getOrdersByUser,
} = require('../controllers/orders.controllers');

// Middlewares
const { protectToken } = require('../middlewares/auth.middlewares');
const {
  userExists,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

const router = express.Router();

router.post('/signup', createUserValidations, checkValidations, createUser);

router.post('/login', loginUser);

router.use(protectToken);

router.get('/orders', getOrdersByUser);

router.get('/orders/:id', getOrderById);

router
  .use('/:id', userExists)
  .route('/:id')
  .get(getUserById)
  .patch(protectAccountOwner, updateUser)
  .delete(protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };