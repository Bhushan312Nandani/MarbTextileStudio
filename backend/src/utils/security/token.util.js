const jwt = require("jsonwebtoken");
const env = require("../../config/env");

/**
 * Owner: Member 4 (Security Specialist)
 * Access tokens are short-lived (JWT_EXPIRE). Refresh tokens are long-lived
 * (REFRESH_TOKEN_EXPIRE) and should be stored in the `user_sessions` table
 * so they can be revoked (see `is_revoked` on that model).
 */

function generateAccessToken(payload) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpire });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.refreshTokenExpire,
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwtRefreshSecret);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
