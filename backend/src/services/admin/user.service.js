const prisma = require("../../config/prisma");

/**
 * Admin User Management Service
 */
async function getAllUsers({ page = 1, limit = 50, role } = {}) {
  const where = {};
  if (role) {
    where.role = role;
  }

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const [users, total] = await Promise.all([
    prisma.users.findMany({
      where,
      skip,
      take: parseInt(limit, 10),
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        is_active: true,
        created_at: true,
        _count: {
          select: {
            orders: true,
            reviews: true,
          },
        },
      },
    }),
    prisma.users.count({ where }),
  ]);

  return { users, total, page: parseInt(page, 10), pages: Math.ceil(total / parseInt(limit, 10)) };
}

async function toggleUserStatus(userId, isActive) {
  const existing = await prisma.users.findUnique({ where: { id: userId } });
  if (!existing) {
    const err = new Error("User not found.");
    err.statusCode = 404;
    throw err;
  }

  return prisma.users.update({
    where: { id: userId },
    data: { is_active: isActive },
    select: {
      id: true,
      email: true,
      is_active: true,
      role: true,
    },
  });
}

module.exports = {
  getAllUsers,
  toggleUserStatus,
};
