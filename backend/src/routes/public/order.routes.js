const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/public/order.controller");
const requireAuth = require("../../middleware/auth.middleware");

// All order routes require authentication
router.use(requireAuth);

router.post("/", orderController.createOrder);
router.get("/", orderController.listOrders);
router.get("/:id", orderController.getOrder);

module.exports = router;
