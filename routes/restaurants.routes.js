const express = require('express');

// Controllers
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurants.controllers');
const {
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews.controllers');

// Middlewares
const {
  createRestaurantValidations,
  checkValidations,
  createReviewValidations,
} = require('../middlewares/validations.middlewares');
const { restaurantExists } = require('../middlewares/restaurants.middlewares');
const {
  protectToken,
  protectAdmin,
} = require('../middlewares/auth.middlewares');
const { reviewExists } = require('../middlewares/reviews.middlewares');
const { protectAccountOwner } = require('../middlewares/users.middlewares');

const router = express.Router();

router.get('/', getAllRestaurants);

router.get('/:id', restaurantExists, getRestaurantById);

router.use(protectToken);

// Create Review
router.post(
  '/reviews/:id',
  restaurantExists,
  createReviewValidations,
  checkValidations,
  createReview
);

router
  .use('/:id/:reviewId', restaurantExists, reviewExists)
  .route('/:id/:reviewId')
  .patch(updateReview)
  .delete(deleteReview);

router.use(protectAdmin);

router.post(
  '/',
  createRestaurantValidations,
  checkValidations,
  createRestaurant
);

router
  .use('/:id', restaurantExists)
  .route('/:id')
  .patch(updateRestaurant)
  .delete(deleteRestaurant);

module.exports = {
  restaurantsRouter: router,
};