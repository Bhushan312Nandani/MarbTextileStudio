const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/product.controller');
const requireAuth = require('../../middleware/auth.middleware');
const requireRole = require('../../middleware/role.middleware');

// All admin product routes require login + ADMIN role
router.post('/', requireAuth, requireRole('ADMIN'), productController.createProduct);
router.put('/:id', requireAuth, requireRole('ADMIN'), productController.updateProduct);
router.delete('/:id', requireAuth, requireRole('ADMIN'), productController.deleteProduct);

module.exports = router;
