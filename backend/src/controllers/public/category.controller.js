const categoryService = require("../../services/public/category.service");

/**
 * Owner: Member 2 (Public API Developer)
 */

async function listCategories(req, res, next) {
  try {
    // const categories = await categoryService.getAllCategories();
    // return res.status(200).json({ data: categories });
    res.status(200).json({ message: "Category List - To be implemented" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listCategories,
};
