const { verifyAccessToken } = require("../utils/security/token.util");

/**
 * Owner: Member 4 (Security Specialist)
 * Verifies `Authorization: Bearer <token>` and attaches decoded payload to req.user.
 * Returns 401 on missing / invalid / expired tokens.
 */
function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Authentication required. No token provided." });
    }

    req.user = verifyAccessToken(token);
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please refresh your session." });
    }
    return res.status(401).json({ message: "Invalid token." });
  }
}

module.exports = requireAuth;
