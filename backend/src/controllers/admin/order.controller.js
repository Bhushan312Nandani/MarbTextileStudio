const orderService = require("../../services/admin/order.service");

async function listOrders(req, res, next) {
  try {
    const result = await orderService.getAllOrders(req.query);
    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const { status, trackingNumber, courierName } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }
    const order = await orderService.updateOrderStatus(req.params.id, {
      status,
      trackingNumber,
      courierName,
    });
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listOrders,
  updateStatus,
};
