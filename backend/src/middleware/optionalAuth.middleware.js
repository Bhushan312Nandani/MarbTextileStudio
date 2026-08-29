const { verifyAccessToken } = require("../utils/security/token.util");

/**
 * Optional Auth Middleware
 * Populates req.user if a valid Bearer token is provided, but allows guest requests through.
 */
function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (token) {
      req.user = verifyAccessToken(token);
    } else {
      req.user = null;
    }
  } catch {
    req.user = null;
  }
  return next();
}

module.exports = optionalAuth;
