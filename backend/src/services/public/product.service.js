const prisma = require("../../config/prisma");

/**
 * Owner: Member 2 (Public API Developer)
 * All direct Prisma queries for customer-facing product data live here.
 * Controllers should never call `prisma` directly — always go through this layer.
 */

// TODO: support pagination (page/limit) and filtering (category, brand, price range)
async function getAllProducts(/* filters */) {
  // return prisma.products.findMany({
  //   where: { is_active: true },
  //   include: { product_images: true, product_variants: true },
  // });
  throw new Error("Not implemented");
}

// TODO: include images, variants, brand, category, and reviews aggregate
async function getProductById(id) {
  // return prisma.products.findUnique({
  //   where: { id },
  //   include: { product_images: true, product_variants: true, reviews: true },
  // });
  throw new Error("Not implemented");
}

// TODO: full-text/ILIKE search on title + description
async function searchProducts(query) {
  throw new Error("Not implemented");
}

module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
};
