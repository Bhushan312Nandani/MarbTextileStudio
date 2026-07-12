const productService = require("../../services/public/product.service");

/**
 * Owner: Member 2 (Public API Developer)
 * Handles req/res only — business logic and DB access belong in product.service.js.
 */

async function listProducts(req, res, next) {
  try {
    // const products = await productService.getAllProducts(req.query);
    // return res.status(200).json({ data: products });
    res.status(200).json({ message: "Product List - To be implemented" });
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    // const product = await productService.getProductById(req.params.id);
    // if (!product) return res.status(404).json({ message: "Product not found" });
    // return res.status(200).json({ data: product });
    res.status(200).json({
      message: `Product details for ID: ${req.params.id} - To be implemented`,
    });
  } catch (err) {
    next(err);
  }
}

async function searchProducts(req, res, next) {
  try {
    // const results = await productService.searchProducts(req.query.q);
    // return res.status(200).json({ data: results });
    res.status(200).json({ message: "Product Search - To be implemented" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProducts,
  getProduct,
  searchProducts,
};
