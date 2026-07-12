const prisma = require("../../config/prisma");

/**
 * Owner: Member 3 (Admin API Developer)
 */

async function getAllOrders(/* filters */) {
  // return prisma.orders.findMany({ include: { order_items: true, users: true } });
  throw new Error("Not implemented");
}

async function updateOrderStatus(id, status) {
  // return prisma.orders.update({ where: { id }, data: { status } });
  throw new Error("Not implemented");
}

module.exports = { getAllOrders, updateOrderStatus };
