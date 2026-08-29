const prisma = require("../../config/prisma");

/** Owner: Member 2 — Product query logic */

const PRODUCT_SELECT = {
  id: true, title: true, description: true, material: true, gender: true, season: true, is_active: true, created_at: true,
  categories: { select: { id: true, name: true } },
  brands:     { select: { id: true, name: true } },
  product_images:   { select: { id: true, image_url: true, is_primary: true } },
  product_variants: { select: { id: true, sku: true, size: true, color: true, stock_quantity: true, price: true } },
  reviews:    { select: { id: true, rating: true, review_text: true, created_at: true, users: { select: { first_name: true, last_name: true } } }, take: 5, orderBy: { created_at: "desc" } },
};

async function getAllProducts({ category, brand, gender, minPrice, maxPrice, sort, page = 1, limit = 20 } = {}) {
  const where = { is_active: true };
  if (category) where.categories = { name: { contains: category, mode: "insensitive" } };
  if (brand)    where.brands     = { name: { contains: brand,    mode: "insensitive" } };
  if (gender)   where.gender     = { equals: gender, mode: "insensitive" };
  if (minPrice || maxPrice) {
    where.product_variants = { some: {
      ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
    }};
  }

  const orderBy = sort === "price-asc"  ? { product_variants: { _min: { price: "asc" } } }
                : sort === "price-desc" ? { product_variants: { _min: { price: "desc" } } }
                : { created_at: "desc" };

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [products, total] = await Promise.all([
    prisma.products.findMany({ where, select: PRODUCT_SELECT, orderBy, skip, take: parseInt(limit) }),
    prisma.products.count({ where }),
  ]);

  return { products, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) };
}

async function getProductById(id) {
  const product = await prisma.products.findFirst({ where: { id, is_active: true }, select: PRODUCT_SELECT });
  if (!product) { const err = new Error("Product not found."); err.statusCode = 404; throw err; }
  return product;
}

async function searchProducts(q) {
  if (!q) return [];
  return prisma.products.findMany({
    where: {
      is_active: true,
      OR: [
        { title:       { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { material:    { contains: q, mode: "insensitive" } },
      ],
    },
    select: PRODUCT_SELECT,
    take: 20,
  });
}

module.exports = { getAllProducts, getProductById, searchProducts };
