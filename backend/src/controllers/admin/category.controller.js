const categoryService = require("../../services/admin/category.service");

/** Owner: Member 3 (Admin API Developer) */

async function createCategory(req, res, next) {
  try {
    res.status(200).json({ message: "Admin: Create Category - To be implemented" });
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    res.status(200).json({ message: `Admin: Update Category ${req.params.id} - To be implemented` });
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    res.status(200).json({ message: `Admin: Delete Category ${req.params.id} - To be implemented` });
  } catch (err) {
    next(err);
  }
}

module.exports = { createCategory, updateCategory, deleteCategory };
