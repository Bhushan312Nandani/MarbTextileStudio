const authService = require("../../services/public/auth.service");

/**
 * Owner: Member 4 (Security Specialist)
 */

async function register(req, res, next) {
  try {
    // const user = await authService.registerUser(req.body);
    // return res.status(201).json({ data: { id: user.id, email: user.email } });
    res.status(200).json({ message: "User Registration - To be implemented" });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    // const { accessToken, refreshToken } = await authService.loginUser(req.body);
    // return res.status(200).json({ accessToken, refreshToken });
    res.status(200).json({ message: "User Login - To be implemented" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
};
