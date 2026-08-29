const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/public/cart.controller");
const requireAuth = require("../../middleware/auth.middleware");

// All cart routes require customer authentication
router.use(requireAuth);

router.get("/", cartController.getCart);
router.post("/items", cartController.addItem);
router.put("/items/:variantId", cartController.updateItem);
router.delete("/items/:variantId", cartController.removeItem);
router.delete("/", cartController.clear);

module.exports = router;
