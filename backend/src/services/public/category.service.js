const prisma = require("../../config/prisma");

/**
 * Owner: Member 2 (Public API Developer)
 */

// TODO: return categories, optionally with product counts
async function getAllCategories() {
  // return prisma.categories.findMany();
  throw new Error("Not implemented");
}

module.exports = {
  getAllCategories,
};
