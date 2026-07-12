const prisma = require("../../config/prisma");

/**
 * Owner: Member 3 (Admin API Developer)
 */

async function createCategory(data) {
  // return prisma.categories.create({ data });
  throw new Error("Not implemented");
}

async function updateCategory(id, data) {
  // return prisma.categories.update({ where: { id }, data });
  throw new Error("Not implemented");
}

async function deleteCategory(id) {
  // return prisma.categories.delete({ where: { id } });
  throw new Error("Not implemented");
}

module.exports = { createCategory, updateCategory, deleteCategory };
