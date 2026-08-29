const categoryService = require("../../services/public/category.service");

async function listCategories(req, res, next) {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (err) {
    next(err);
  }
}

async function getCategory(req, res, next) {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listCategories,
  getCategory,
};
