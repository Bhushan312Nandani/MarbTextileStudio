const prisma = require("../../config/prisma");

/**
 * Admin Product Service
 */
async function getAllAdminProducts({ page = 1, limit = 50, search = "" } = {}) {
  const where = {};
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const [products, total] = await Promise.all([
    prisma.products.findMany({
      where,
      skip,
      take: parseInt(limit, 10),
      orderBy: { created_at: "desc" },
      include: {
        categories: { select: { id: true, name: true } },
        brands: { select: { id: true, name: true } },
        product_images: true,
        product_variants: true,
        _count: { select: { reviews: true } },
      },
    }),
    prisma.products.count({ where }),
  ]);

  return { products, total, page: parseInt(page, 10), pages: Math.ceil(total / parseInt(limit, 10)) };
}

async function createProduct(sellerId, {
  title,
  description,
  material,
  gender,
  season,
  categoryId,
  brandId,
  images = [],
  variants = [],
}) {
  if (!title) {
    const err = new Error("Product title is required.");
    err.statusCode = 400;
    throw err;
  }

  return prisma.products.create({
    data: {
      seller_id: sellerId || null,
      title,
      description: description || null,
      material: material || null,
      gender: gender || null,
      season: season || null,
      category_id: categoryId || null,
      brand_id: brandId || null,
      product_images: {
        create: images.map((img, idx) => ({
          image_url: typeof img === "string" ? img : img.url,
          is_primary: idx === 0 || (typeof img === "object" && img.isPrimary),
        })),
      },
      product_variants: {
        create: variants.map((v) => ({
          sku: v.sku || `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          size: v.size || "M",
          color: v.color || "Standard",
          stock_quantity: parseInt(v.stockQuantity || v.stock || 0, 10),
          price: parseFloat(v.price || 0),
          weight: v.weight ? parseFloat(v.weight) : null,
          barcode: v.barcode || null,
        })),
      },
    },
    include: {
      product_images: true,
      product_variants: true,
      categories: true,
      brands: true,
    },
  });
}

async function updateProduct(id, {
  title,
  description,
  material,
  gender,
  season,
  categoryId,
  brandId,
  isActive,
}) {
  const existing = await prisma.products.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error("Product not found.");
    err.statusCode = 404;
    throw err;
  }

  return prisma.products.update({
    where: { id },
    data: {
      title: title !== undefined ? title : existing.title,
      description: description !== undefined ? description : existing.description,
      material: material !== undefined ? material : existing.material,
      gender: gender !== undefined ? gender : existing.gender,
      season: season !== undefined ? season : existing.season,
      category_id: categoryId !== undefined ? categoryId : existing.category_id,
      brand_id: brandId !== undefined ? brandId : existing.brand_id,
      is_active: isActive !== undefined ? isActive : existing.is_active,
      updated_at: new Date(),
    },
    include: {
      product_images: true,
      product_variants: true,
      categories: true,
      brands: true,
    },
  });
}

async function deleteProduct(id) {
  const existing = await prisma.products.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error("Product not found.");
    err.statusCode = 404;
    throw err;
  }

  // Soft delete for inventory integrity
  return prisma.products.update({
    where: { id },
    data: { is_active: false, updated_at: new Date() },
  });
}

module.exports = {
  getAllAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
