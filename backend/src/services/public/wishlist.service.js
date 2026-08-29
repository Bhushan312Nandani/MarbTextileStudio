const prisma = require("../../config/prisma");

/** Owner: Member 3 */

async function ensureWishlist(userId) {
  let wl = await prisma.wishlists.findFirst({ where: { user_id: userId } });
  if (!wl) wl = await prisma.wishlists.create({ data: { user_id: userId } });
  return wl;
}

async function getWishlist(userId) {
  const wl = await prisma.wishlists.findFirst({
    where: { user_id: userId },
    include: {
      wishlist_items: {
        include: {
          products: {
            include: {
              product_images:   { where: { is_primary: true } },
              product_variants: { take: 1, orderBy: { price: "asc" } },
            },
          },
        },
      },
    },
  });
  return wl?.wishlist_items ?? [];
}

async function addToWishlist(userId, productId) {
  const product = await prisma.products.findUnique({ where: { id: productId } });
  if (!product) { const err = new Error("Product not found."); err.statusCode = 404; throw err; }
  const wl = await ensureWishlist(userId);
  await prisma.wishlist_items.upsert({
    where:  { wishlist_id_product_id: { wishlist_id: wl.id, product_id: productId } },
    update: {},
    create: { wishlist_id: wl.id, product_id: productId },
  });
}

async function removeFromWishlist(userId, productId) {
  const wl = await prisma.wishlists.findFirst({ where: { user_id: userId } });
  if (!wl) return;
  await prisma.wishlist_items.deleteMany({ where: { wishlist_id: wl.id, product_id: productId } });
}

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
