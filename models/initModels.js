// Models
const { User } = require('./user.model');
const { Restaurant } = require('./restaurant.model');
const { Meal } = require('../models/meal.model');
const { Review } = require('./review.model');
const { Order } = require('./order.model');

const initModels = () => {
  // 1 User <---> M Orders
  User.hasMany(Order);
  Order.belongsTo(User);

  // 1 User <---> M Reviews
  User.hasMany(Review);
  Review.belongsTo(User);

  // 1 Restaurant <---> M Meals
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  // 1 Restaurant <---> M Reviews
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  // 1 Order <---> 1 Meal
  Meal.hasOne(Meal);
  Order.belongsTo(Meal);
};

module.exports = { initModels };