const prisma = require("../../config/prisma");

/**
 * Public Review Service
 */
async function getProductReviews(productId) {
  return prisma.reviews.findMany({
    where: { product_id: productId },
    orderBy: { created_at: "desc" },
    include: {
      users: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
    },
  });
}

async function addProductReview(userId, { productId, rating, reviewText }) {
  if (!rating || rating < 1 || rating > 5) {
    const err = new Error("Rating must be between 1 and 5.");
    err.statusCode = 400;
    throw err;
  }

  // Check if product exists
  const product = await prisma.products.findUnique({
    where: { id: productId },
  });
  if (!product) {
    const err = new Error("Product not found.");
    err.statusCode = 404;
    throw err;
  }

  // Check if user has purchased this product (verified purchase)
  const purchase = await prisma.order_items.findFirst({
    where: {
      product_variants: { product_id: productId },
      orders: { user_id: userId, status: "DELIVERED" },
    },
  });

  return prisma.reviews.create({
    data: {
      user_id: userId,
      product_id: productId,
      rating: parseInt(rating, 10),
      review_text: reviewText || null,
      is_verified_purchase: Boolean(purchase),
    },
    include: {
      users: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  });
}

module.exports = {
  getProductReviews,
  addProductReview,
};
