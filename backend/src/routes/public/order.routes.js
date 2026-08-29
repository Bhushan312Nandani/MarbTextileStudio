const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/public/order.controller");
const requireAuth = require("../../middleware/auth.middleware");
const optionalAuth = require("../../middleware/optionalAuth.middleware");

// Allow both guest and logged-in customers to place orders
router.post("/", optionalAuth, orderController.createOrder);

// Account-specific order listing requires auth
router.get("/", requireAuth, orderController.listOrders);
router.get("/:id", optionalAuth, orderController.getOrder);

module.exports = router;
