const prisma           = require("../../config/prisma");
const { hashPassword, comparePassword } = require("../../utils/security/password.util");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../../utils/security/token.util");

/** Owner: Member 4 — Auth business logic */

async function registerUser({ first_name, last_name, email, password }) {
  const existing = await prisma.users.findUnique({ where: { email } });
  if (existing) {
    const err = new Error("Email already in use.");
    err.statusCode = 409;
    throw err;
  }
  const password_hash = await hashPassword(password);
  const user = await prisma.users.create({
    data: { first_name, last_name, email, password_hash, role: "CUSTOMER" },
    select: { id: true, first_name: true, last_name: true, email: true, role: true },
  });
  await prisma.carts.create({ data: { user_id: user.id } });
  return user;
}

async function loginUser({ email, password }, { ip, userAgent } = {}) {
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user || !user.is_active) {
    const err = new Error("Invalid credentials.");
    err.statusCode = 401;
    throw err;
  }
  const valid = await comparePassword(password, user.password_hash);
  if (!valid) {
    const err = new Error("Invalid credentials.");
    err.statusCode = 401;
    throw err;
  }
  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken  = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  await prisma.user_sessions.create({
    data: {
      user_id: user.id,
      refresh_token: refreshToken,
      device_ip: ip || null,
      user_agent: userAgent || null,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  return {
    accessToken,
    refreshToken,
    user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, role: user.role },
  };
}

async function refreshTokens(oldRefreshToken) {
  let payload;
  try { payload = verifyRefreshToken(oldRefreshToken); }
  catch { const err = new Error("Invalid refresh token."); err.statusCode = 401; throw err; }

  const session = await prisma.user_sessions.findUnique({ where: { refresh_token: oldRefreshToken } });
  if (!session || session.is_revoked || session.expires_at < new Date()) {
    const err = new Error("Refresh token expired or revoked."); err.statusCode = 401; throw err;
  }
  await prisma.user_sessions.update({ where: { id: session.id }, data: { is_revoked: true } });

  const user = await prisma.users.findUnique({ where: { id: payload.id } });
  const newPayload      = { id: user.id, email: user.email, role: user.role };
  const accessToken     = generateAccessToken(newPayload);
  const newRefreshToken = generateRefreshToken(newPayload);
  await prisma.user_sessions.create({
    data: { user_id: user.id, refresh_token: newRefreshToken, expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  });
  return { accessToken, refreshToken: newRefreshToken };
}

async function logoutUser(refreshToken) {
  if (!refreshToken) return;
  await prisma.user_sessions.updateMany({ where: { refresh_token: refreshToken }, data: { is_revoked: true } });
}

async function getMe(userId) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { id: true, first_name: true, last_name: true, email: true, role: true, is_active: true, created_at: true, addresses: true },
  });
  if (!user) { const err = new Error("User not found."); err.statusCode = 404; throw err; }
  return user;
}

module.exports = { registerUser, loginUser, refreshTokens, logoutUser, getMe };
