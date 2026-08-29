const prisma = require("../../config/prisma");

/** Owner: Member 3 — Cart logic. Cart is per-user (1:1 via carts table). */

async function ensureCart(userId) {
  let cart = await prisma.carts.findUnique({ where: { user_id: userId } });
  if (!cart) cart = await prisma.carts.create({ data: { user_id: userId } });
  return cart;
}

async function getCart(userId) {
  const cart = await prisma.carts.findUnique({
    where: { user_id: userId },
    include: {
      cart_items: {
        include: {
          product_variants: {
            include: { products: { include: { product_images: { where: { is_primary: true } } } } },
          },
        },
      },
    },
  });
  if (!cart) return { items: [], subtotal: 0 };

  const items = cart.cart_items.map((item) => ({
    cartItemId: item.id,
    variantId:  item.variant_id,
    quantity:   item.quantity,
    size:       item.product_variants.size,
    color:      item.product_variants.color,
    sku:        item.product_variants.sku,
    price:      parseFloat(item.product_variants.price),
    stock:      item.product_variants.stock_quantity,
    product: {
      id:    item.product_variants.products.id,
      title: item.product_variants.products.title,
      image: item.product_variants.products.product_images[0]?.image_url ?? null,
    },
    lineTotal: parseFloat(item.product_variants.price) * item.quantity,
  }));

  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  return { cartId: cart.id, items, subtotal };
}

async function addToCart(userId, { variantId, quantity = 1 }) {
  const cart = await ensureCart(userId);

  // Validate variant exists + enough stock
  const variant = await prisma.product_variants.findUnique({ where: { id: variantId } });
  if (!variant) { const err = new Error("Variant not found."); err.statusCode = 404; throw err; }
  if (variant.stock_quantity < quantity) { const err = new Error("Not enough stock."); err.statusCode = 400; throw err; }

  // Upsert: if already in cart, increment quantity
  const existing = await prisma.cart_items.findUnique({ where: { cart_id_variant_id: { cart_id: cart.id, variant_id: variantId } } });
  if (existing) {
    const newQty = existing.quantity + quantity;
    if (variant.stock_quantity < newQty) { const err = new Error("Not enough stock."); err.statusCode = 400; throw err; }
    return prisma.cart_items.update({ where: { id: existing.id }, data: { quantity: newQty } });
  }
  return prisma.cart_items.create({ data: { cart_id: cart.id, variant_id: variantId, quantity } });
}

async function updateCartItem(userId, variantId, quantity) {
  const cart = await ensureCart(userId);
  if (quantity < 1) { const err = new Error("Quantity must be at least 1."); err.statusCode = 400; throw err; }
  const variant = await prisma.product_variants.findUnique({ where: { id: variantId } });
  if (!variant || variant.stock_quantity < quantity) { const err = new Error("Not enough stock."); err.statusCode = 400; throw err; }
  return prisma.cart_items.update({
    where: { cart_id_variant_id: { cart_id: cart.id, variant_id: variantId } },
    data: { quantity },
  });
}

async function removeFromCart(userId, variantId) {
  const cart = await ensureCart(userId);
  await prisma.cart_items.deleteMany({ where: { cart_id: cart.id, variant_id: variantId } });
}

async function clearCart(userId) {
  const cart = await prisma.carts.findUnique({ where: { user_id: userId } });
  if (cart) await prisma.cart_items.deleteMany({ where: { cart_id: cart.id } });
}

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
