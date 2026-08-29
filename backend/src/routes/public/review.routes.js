const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/public/review.controller");
const requireAuth = require("../../middleware/auth.middleware");

// Public: view reviews for a product
router.get("/:productId", reviewController.getReviews);

// Protected: submit review
router.post("/", requireAuth, reviewController.addReview);

module.exports = router;
