const express = require('express');

// Controllers
const {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} = require('../controllers/meals.controllers');

// Middlewares
const {
  createMealValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');
const { mealExists } = require('../middlewares/meals.middlewares');
const {
  protectToken,
  protectAdmin,
} = require('../middlewares/auth.middlewares');
const { restaurantExists } = require('../middlewares/restaurants.middlewares');

const router = express.Router();

router.get('/', getAllMeals);

router.get('/:id', mealExists, getMealById);

router.use(protectToken, protectAdmin);

router.post(
  '/:id',
  restaurantExists,
  createMealValidations,
  checkValidations,
  createMeal
);

router
  .use('/:id', mealExists)
  .route('/:id')
  .patch(updateMeal)
  .delete(deleteMeal);

module.exports = {
  mealsRouter: router,
};