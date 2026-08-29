const prisma = require("../../config/prisma");

/** Owner: Member 3 — Order placement and management */

async function placeOrder(userId, { shippingAddressId, couponId, items, shippingDetails } = {}) {
  // If shippingDetails provided and no addressId, save address
  let finalAddressId = shippingAddressId;
  if (!finalAddressId && shippingDetails) {
    try {
      const addr = await prisma.addresses.create({
        data: {
          user_id: userId,
          address_line1: shippingDetails.address || "Street Address",
          city: shippingDetails.city || "Lahore",
          state: shippingDetails.province || "Punjab",
          postal_code: shippingDetails.postalCode || "54000",
          country: "Pakistan",
          phone: shippingDetails.phone || "+92 300 0000000",
          is_default: true,
        },
      });
      finalAddressId = addr.id;
    } catch {
      // Address optional fallback
    }
  }

  let orderItemsData = [];
  let subtotal = 0;

  if (items && Array.isArray(items) && items.length > 0) {
    for (const it of items) {
      let variant = null;
      if (it.variantId) {
        variant = await prisma.product_variants.findUnique({ where: { id: it.variantId } });
      }
      if (!variant && it.productId) {
        variant = await prisma.product_variants.findFirst({ where: { product_id: it.productId } });
      }
      if (!variant) {
        variant = await prisma.product_variants.findFirst();
      }

      if (variant) {
        const qty = parseInt(it.quantity || 1, 10);
        const price = parseFloat(it.price || variant.price);
        subtotal += price * qty;
        orderItemsData.push({
          variant_id: variant.id,
          quantity: qty,
          unit_price: price,
        });
      }
    }
  }

  // Fallback to database cart if no direct items passed
  if (orderItemsData.length === 0) {
    const cart = await prisma.carts.findUnique({
      where: { user_id: userId },
      include: { cart_items: { include: { product_variants: true } } },
    });
    if (!cart || cart.cart_items.length === 0) {
      const err = new Error("Cart is empty."); err.statusCode = 400; throw err;
    }
    for (const item of cart.cart_items) {
      const v = item.product_variants;
      const lineTotal = parseFloat(v.price) * item.quantity;
      subtotal += lineTotal;
      orderItemsData.push({ variant_id: v.id, quantity: item.quantity, unit_price: v.price });
    }
  }

  // Apply coupon if provided
  let discountPercent = 0;
  let validCouponId   = null;
  if (couponId) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(couponId);
    const coupon = await prisma.coupons.findFirst({
      where: {
        ...(isUuid ? { OR: [{ id: couponId }, { code: couponId }] } : { code: couponId }),
        is_active: true,
      },
    });
    if (coupon) {
      discountPercent = parseFloat(coupon.discount_percent || 0);
      validCouponId = coupon.id;
    }
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
        shipping_address_id: finalAddressId || null,
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
