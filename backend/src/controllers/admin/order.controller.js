const orderService = require("../../services/admin/order.service");

/** Owner: Member 3 (Admin API Developer) */

async function listOrders(req, res, next) {
  try {
    res.status(200).json({ message: "Admin: Order List - To be implemented" });
  } catch (err) {
    next(err);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    res.status(200).json({ message: `Admin: Update Order ${req.params.id} status - To be implemented` });
  } catch (err) {
    next(err);
  }
}

module.exports = { listOrders, updateOrderStatus };
