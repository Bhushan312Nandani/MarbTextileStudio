const productService = require("../../services/admin/product.service");

/** Owner: Member 3 (Admin API Developer) */

async function createProduct(req, res, next) {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json({ data: product });
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    return res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await productService.deleteProduct(req.params.id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { createProduct, updateProduct, deleteProduct };
