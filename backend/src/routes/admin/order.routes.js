const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/admin/order.controller");

router.get("/", orderController.listOrders);
router.put("/:id/status", orderController.updateStatus);

module.exports = router;
