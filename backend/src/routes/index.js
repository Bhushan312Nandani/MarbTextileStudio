const express = require('express');
const router = express.Router();

// Placeholders for the interns to implement their specific routes
const productRoutes = require('./public/product.routes');
const categoryRoutes = require('./public/category.routes');
const authRoutes = require('./public/auth.routes');
const adminRoutes = require('./admin/index');

// Connect the public routes
router.use('/public/products', productRoutes);
router.use('/public/categories', categoryRoutes);
router.use('/public/auth', authRoutes);

// Connect the admin routes (all protected by auth + role middleware)
router.use('/admin', adminRoutes);

// Export the main router
module.exports = router;
