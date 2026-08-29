const prisma = require("../../config/prisma");

/**
 * Admin Category Service
 */
async function createCategory({ name, description }) {
  if (!name) {
    const err = new Error("Category name is required.");
    err.statusCode = 400;
    throw err;
  }

  const existing = await prisma.categories.findUnique({ where: { name } });
  if (existing) {
    const err = new Error("Category name already exists.");
    err.statusCode = 409;
    throw err;
  }

  return prisma.categories.create({
    data: { name, description: description || null },
  });
}

async function updateCategory(id, { name, description }) {
  const existing = await prisma.categories.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error("Category not found.");
    err.statusCode = 404;
    throw err;
  }

  return prisma.categories.update({
    where: { id },
    data: {
      name: name !== undefined ? name : existing.name,
      description: description !== undefined ? description : existing.description,
    },
  });
}

async function deleteCategory(id) {
  const existing = await prisma.categories.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error("Category not found.");
    err.statusCode = 404;
    throw err;
  }

  return prisma.categories.delete({ where: { id } });
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
};
