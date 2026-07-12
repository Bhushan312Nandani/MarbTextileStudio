const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/category.controller');
const requireAuth = require('../../middleware/auth.middleware');
const requireRole = require('../../middleware/role.middleware');

router.post('/', requireAuth, requireRole('ADMIN'), categoryController.createCategory);
router.put('/:id', requireAuth, requireRole('ADMIN'), categoryController.updateCategory);
router.delete('/:id', requireAuth, requireRole('ADMIN'), categoryController.deleteCategory);

module.exports = router;
