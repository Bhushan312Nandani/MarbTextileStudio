const productService = require("../../services/admin/product.service");

async function listProducts(req, res, next) {
  try {
    const result = await productService.getAllAdminProducts(req.query);
    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const product = await productService.createProduct(req.user.id, req.body);
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const product = await productService.deleteProduct(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
