const prisma = require("../../config/prisma");

/**
 * Owner: Member 3 (Admin API Developer)
 * Product CRUD for the store-owner dashboard.
 */

async function createProduct(data) {
  return prisma.products.create({ data });
}

async function updateProduct(id, data) {
  return prisma.products.update({ where: { id }, data });
}

async function deleteProduct(id) {
  return prisma.products.delete({ where: { id } });
}

module.exports = { createProduct, updateProduct, deleteProduct };
