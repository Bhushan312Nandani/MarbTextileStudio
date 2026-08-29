const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const orderController = require("../../controllers/public/order.controller");
const requireAuth = require("../../middleware/auth.middleware");
const optionalAuth = require("../../middleware/optionalAuth.middleware");

// ── IP Rate Limiter for Order Placement (Prevents spam/bot checkout attacks) ──
const orderPlacementLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 orders per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many order attempts from this IP address. Please wait 15 minutes before placing another order.",
  },
});

// Allow both guest and logged-in customers to place orders with IP rate limiting
router.post("/", orderPlacementLimiter, optionalAuth, orderController.createOrder);

// Account-specific order listing requires auth
router.get("/", requireAuth, orderController.listOrders);
router.get("/:id", optionalAuth, orderController.getOrder);

module.exports = router;
