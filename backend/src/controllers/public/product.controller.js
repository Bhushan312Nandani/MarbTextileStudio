const productService = require("../../services/public/product.service");

/**
 * Public Product Controller
 */
async function listProducts(req, res, next) {
  try {
    const result = await productService.getAllProducts(req.query);
    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
}

async function searchProducts(req, res, next) {
  try {
    const results = await productService.searchProducts(req.query.q);
    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProducts,
  getProduct,
  searchProducts,
};
