const categoryService = require("../../services/admin/category.service");

async function createCategory(req, res, next) {
  try {
    const category = await categoryService.createCategory(req.body);
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: category,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
};
