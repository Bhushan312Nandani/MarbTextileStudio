const { verifyAccessToken } = require("../utils/security/token.util");

/**
 * Owner: Member 4 (Security Specialist)
 * Verifies the `Authorization: Bearer <token>` header and attaches the
 * decoded payload to `req.user`. Use on any route that requires login.
 */
function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // TODO: uncomment once token.util.js is wired to real JWT_SECRET
    // req.user = verifyAccessToken(token);
    // return next();

    return res.status(501).json({ message: "Auth middleware - To be implemented" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = requireAuth;
