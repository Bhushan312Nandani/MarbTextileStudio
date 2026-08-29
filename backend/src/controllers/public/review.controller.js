const reviewService = require("../../services/public/review.service");

async function getReviews(req, res, next) {
  try {
    const reviews = await reviewService.getProductReviews(req.params.productId);
    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    next(err);
  }
}

async function addReview(req, res, next) {
  try {
    const { productId, rating, reviewText } = req.body;
    const review = await reviewService.addProductReview(req.user.id, {
      productId,
      rating,
      reviewText,
    });
    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getReviews,
  addReview,
};
