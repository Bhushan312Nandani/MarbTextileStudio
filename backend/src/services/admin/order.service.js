const prisma = require("../../config/prisma");

/**
 * Admin Order Service
 */
async function getAllOrders({ page = 1, limit = 50, status } = {}) {
  const where = {};
  if (status) {
    where.status = status;
  }

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const [orders, total] = await Promise.all([
    prisma.orders.findMany({
      where,
      skip,
      take: parseInt(limit, 10),
      orderBy: { created_at: "desc" },
      include: {
        users: { select: { id: true, first_name: true, last_name: true, email: true } },
        addresses: true,
        order_items: {
          include: {
            product_variants: {
              include: {
                products: { select: { id: true, title: true } },
              },
            },
          },
        },
        payments: true,
        shipments: true,
      },
    }),
    prisma.orders.count({ where }),
  ]);

  return { orders, total, page: parseInt(page, 10), pages: Math.ceil(total / parseInt(limit, 10)) };
}

async function updateOrderStatus(orderId, { status, trackingNumber, courierName }) {
  const existing = await prisma.orders.findUnique({ where: { id: orderId } });
  if (!existing) {
    const err = new Error("Order not found.");
    err.statusCode = 404;
    throw err;
  }

  const updatedOrder = await prisma.orders.update({
    where: { id: orderId },
    data: { status },
  });

  // If status is SHIPPED or DELIVERED, update shipment record
  if (trackingNumber || courierName || status === "SHIPPED" || status === "DELIVERED") {
    await prisma.shipments.upsert({
      where: { order_id: orderId },
      update: {
        status,
        tracking_number: trackingNumber || undefined,
        courier_name: courierName || undefined,
        shipped_at: status === "SHIPPED" ? new Date() : undefined,
        delivered_at: status === "DELIVERED" ? new Date() : undefined,
      },
      create: {
        order_id: orderId,
        status,
        tracking_number: trackingNumber || null,
        courier_name: courierName || null,
        shipped_at: status === "SHIPPED" ? new Date() : null,
        delivered_at: status === "DELIVERED" ? new Date() : null,
      },
    });
  }

  return updatedOrder;
}

module.exports = {
  getAllOrders,
  updateOrderStatus,
};
