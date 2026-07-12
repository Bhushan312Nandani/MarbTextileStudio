const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/admin/order.controller');
const requireAuth = require('../../middleware/auth.middleware');
const requireRole = require('../../middleware/role.middleware');

router.get('/', requireAuth, requireRole('ADMIN'), orderController.listOrders);
router.patch('/:id/status', requireAuth, requireRole('ADMIN'), orderController.updateOrderStatus);

module.exports = router;
