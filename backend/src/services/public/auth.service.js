const prisma = require("../../config/prisma");
const { hashPassword, comparePassword } = require("../../utils/security/password.util");
const { generateAccessToken, generateRefreshToken } = require("../../utils/security/token.util");

/**
 * Owner: Member 4 (Security Specialist)
 */

// TODO: check for existing email, hash password, create `users` row
async function registerUser({ first_name, last_name, email, password }) {
  // const existing = await prisma.users.findUnique({ where: { email } });
  // if (existing) throw new Error("Email already registered");
  // const password_hash = await hashPassword(password);
  // return prisma.users.create({
  //   data: { first_name, last_name, email, password_hash },
  // });
  throw new Error("Not implemented");
}

// TODO: look up user by email, compare password, issue access + refresh tokens,
// persist the refresh token in `user_sessions`
async function loginUser({ email, password }) {
  // const user = await prisma.users.findUnique({ where: { email } });
  // if (!user || !(await comparePassword(password, user.password_hash))) {
  //   throw new Error("Invalid credentials");
  // }
  // const accessToken = generateAccessToken({ sub: user.id, role: user.role });
  // const refreshToken = generateRefreshToken({ sub: user.id });
  // await prisma.user_sessions.create({
  //   data: { user_id: user.id, refresh_token: refreshToken, expires_at: /* now + REFRESH_TOKEN_EXPIRE */ new Date() },
  // });
  // return { accessToken, refreshToken, user };
  throw new Error("Not implemented");
}

module.exports = {
  registerUser,
  loginUser,
};
