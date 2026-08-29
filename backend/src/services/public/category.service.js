const prisma = require("../../config/prisma");

async function getAllCategories() {
  return prisma.categories.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, description: true, created_at: true, _count: { select: { products: { where: { is_active: true } } } } },
  });
}

async function getCategoryById(id) {
  const cat = await prisma.categories.findUnique({ where: { id }, include: { products: { where: { is_active: true }, take: 10, include: { product_images: true, product_variants: { take: 1 } } } } });
  if (!cat) { const err = new Error("Category not found."); err.statusCode = 404; throw err; }
  return cat;
}

module.exports = { getAllCategories, getCategoryById };
