const authService = require("../../services/public/auth.service");

/**
 * Public Auth Controller
 */
async function register(req, res, next) {
  try {
    const user = await authService.registerUser(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const meta = {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    };
    const result = await authService.loginUser(req.body, meta);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      ...result,
    });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required." });
    }
    const tokens = await authService.refreshTokens(refreshToken);
    return res.status(200).json({
      success: true,
      ...tokens,
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const { refreshToken } = req.body;
    await authService.logoutUser(refreshToken);
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function getProfile(req, res, next) {
  try {
    const user = await authService.getMe(req.user.id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  refresh,
  logout,
  getProfile,
};
