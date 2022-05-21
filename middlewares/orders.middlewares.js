// Models
const { Order } = require('../models/order.model');
const { AppError } = require('../utils/appError');

// Utils
const { catchAsync } = require('../utils/catchAsync');

const orderExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!order) {
    return next(new AppError(404, 'Order does not exit with the given Id'));
  }

  req.order = order;

  next();
});

module.exports = { orderExists };

