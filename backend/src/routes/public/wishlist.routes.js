const express = require("express");
const router = express.Router();
const wishlistController = require("../../controllers/public/wishlist.controller");
const requireAuth = require("../../middleware/auth.middleware");

// All wishlist routes require authentication
router.use(requireAuth);

router.get("/", wishlistController.getWishlist);
router.post("/", wishlistController.addToWishlist);
router.delete("/:productId", wishlistController.removeFromWishlist);

module.exports = router;
