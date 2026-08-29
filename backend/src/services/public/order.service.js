const prisma = require("../../config/prisma");

/** Owner: Member 3 — Order placement and management */

async function placeOrder(userId, { shippingAddressId, couponId }) {
  // Get user cart
  const cart = await prisma.carts.findUnique({
    where: { user_id: userId },
    include: { cart_items: { include: { product_variants: true } } },
  });
  if (!cart || cart.cart_items.length === 0) {
    const err = new Error("Cart is empty."); err.statusCode = 400; throw err;
  }

  // Validate shipping address belongs to user
  if (shippingAddressId) {
    const addr = await prisma.addresses.findFirst({ where: { id: shippingAddressId, user_id: userId } });
    if (!addr) { const err = new Error("Shipping address not found."); err.statusCode = 404; throw err; }
  }

  // Apply coupon if provided
  let discountPercent = 0;
  let validCouponId   = null;
  if (couponId) {
    const coupon = await prisma.coupons.findFirst({ where: { id: couponId, is_active: true, expiry_date: { gte: new Date() } } });
    if (coupon) { discountPercent = parseFloat(coupon.discount_percent || 0); validCouponId = coupon.id; }
  }

  // Calculate amounts
  let subtotal = 0;
  const orderItemsData = [];
  for (const item of cart.cart_items) {
    const v = item.product_variants;
    if (v.stock_quantity < item.quantity) {
      const err = new Error(`Not enough stock for variant ${v.sku}.`); err.statusCode = 400; throw err;
    }
    const lineTotal = parseFloat(v.price) * item.quantity;
    subtotal += lineTotal;
    orderItemsData.push({ variant_id: v.id, quantity: item.quantity, unit_price: v.price });
  }

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee    = subtotal >= 5000 ? 0 : 299;
  const taxAmount      = (subtotal - discountAmount) * 0.05; // 5% GST
  const grandTotal     = subtotal - discountAmount + shippingFee + taxAmount;

  // Create order + order_items in a transaction
  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.orders.create({
      data: {
        user_id:             userId,
        shipping_address_id: shippingAddressId || null,
        coupon_id:           validCouponId,
        subtotal,
        discount_amount:     discountAmount,
        shipping_fee:        shippingFee,
        tax_amount:          taxAmount,
        grand_total:         grandTotal,
        status:              "PENDING",
        order_items: { create: orderItemsData },
      },
      include: { order_items: true },
    });

    // Deduct stock for each variant
    for (const item of cart.cart_items) {
      await tx.product_variants.update({
        where: { id: item.variant_id },
        data:  { stock_quantity: { decrement: item.quantity } },
      });
      await tx.inventory_logs.create({
        data: { variant_id: item.variant_id, quantity_change: -item.quantity, reason: "Order placed" },
      });
    }

    // Clear the cart
    await tx.cart_items.deleteMany({ where: { cart_id: cart.id } });

    // Create a pending payment record
    await tx.payments.create({
      data: { order_id: newOrder.id, payment_method: "CASH_ON_DELIVERY", amount: grandTotal, status: "PENDING" },
    });

    // Create shipment record
    await tx.shipments.create({
      data: { order_id: newOrder.id, status: "PENDING" },
    });

    return newOrder;
  });

  return getOrderById(userId, order.id);
}

async function getUserOrders(userId) {
  return prisma.orders.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    include: {
      order_items: { include: { product_variants: { include: { products: { include: { product_images: { where: { is_primary: true } } } } } } } },
      shipments: true,
      payments:  true,
    },
  });
}

async function getOrderById(userId, orderId) {
  const order = await prisma.orders.findFirst({
    where: { id: orderId, user_id: userId },
    include: {
      order_items: { include: { product_variants: { include: { products: { include: { product_images: true } } } } } },
      addresses: true,
      shipments:  true,
      payments:   true,
      coupons:    true,
    },
  });
  if (!order) { const err = new Error("Order not found."); err.statusCode = 404; throw err; }
  return order;
}

module.exports = { placeOrder, getUserOrders, getOrderById };
