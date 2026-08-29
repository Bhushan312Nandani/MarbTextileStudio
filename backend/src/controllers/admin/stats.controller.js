const statsService = require("../../services/admin/stats.service");

async function getStats(req, res, next) {
  try {
    const stats = await statsService.getDashboardStats();
    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getStats,
};
