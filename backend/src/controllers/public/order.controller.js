const orderService = require("../../services/public/order.service");

async function createOrder(req, res, next) {
  try {
    const { shippingAddressId, couponId } = req.body;
    const order = await orderService.placeOrder(req.user.id, {
      shippingAddressId,
      couponId,
    });
    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (err) {
    next(err);
  }
}

async function listOrders(req, res, next) {
  try {
    const orders = await orderService.getUserOrders(req.user.id);
    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
}

async function getOrder(req, res, next) {
  try {
    const order = await orderService.getOrderById(req.user.id, req.params.id);
    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createOrder,
  listOrders,
  getOrder,
};
