const bcrypt = require("bcrypt");

const SALT_ROUNDS = 12;

/**
 * Owner: Member 4 (Security Specialist)
 * Hashes a plain-text password. Use SALT_ROUNDS=12 for good security/performance balance.
 * @param {string} plainPassword
 * @returns {Promise<string>} hashed password
 */
async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

/**
 * Compares a plain-text password against a stored hash.
 * @param {string} plainPassword
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
async function comparePassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

module.exports = { hashPassword, comparePassword };
