const prisma = require("../../config/prisma");

/**
 * Admin Stats & Metrics Service
 */
async function getDashboardStats() {
  const [
    totalProducts,
    totalOrders,
    totalUsers,
    ordersAgg,
    recentOrders,
    lowStockVariants,
  ] = await Promise.all([
    prisma.products.count({ where: { is_active: true } }),
    prisma.orders.count(),
    prisma.users.count({ where: { role: "CUSTOMER" } }),
    prisma.orders.aggregate({
      _sum: { grand_total: true },
    }),
    prisma.orders.findMany({
      take: 5,
      orderBy: { created_at: "desc" },
      include: {
        users: { select: { first_name: true, last_name: true, email: true } },
      },
    }),
    prisma.product_variants.findMany({
      where: { stock_quantity: { lte: 10 } },
      take: 10,
      include: {
        products: { select: { title: true } },
      },
    }),
  ]);

  const totalRevenue = parseFloat(ordersAgg._sum.grand_total || 0);

  return {
    totalProducts,
    totalOrders,
    totalUsers,
    totalRevenue,
    recentOrders,
    lowStockVariants,
  };
}

module.exports = {
  getDashboardStats,
};
