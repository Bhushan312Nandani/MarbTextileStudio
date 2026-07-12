/**
 * Owner: Member 4 (Security Specialist)
 * Restricts a route to specific `users.role` values (e.g. "ADMIN", "SELLER").
 * Must run AFTER auth.middleware.js so `req.user` is already populated.
 *
 * Usage: router.post('/admin/products', requireAuth, requireRole('ADMIN'), ...)
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    return next();
  };
}

module.exports = requireRole;
