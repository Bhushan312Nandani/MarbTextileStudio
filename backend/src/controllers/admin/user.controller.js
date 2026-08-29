const userService = require("../../services/admin/user.service");

async function listUsers(req, res, next) {
  try {
    const result = await userService.getAllUsers(req.query);
    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
}

async function toggleStatus(req, res, next) {
  try {
    const { isActive } = req.body;
    if (isActive === undefined) {
      return res.status(400).json({ message: "isActive is required." });
    }
    const user = await userService.toggleUserStatus(req.params.id, Boolean(isActive));
    return res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listUsers,
  toggleStatus,
};
