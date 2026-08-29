const express = require("express");
const router = express.Router();

const productRoutes = require("./public/product.routes");
const categoryRoutes = require("./public/category.routes");
const authRoutes = require("./public/auth.routes");
const cartRoutes = require("./public/cart.routes");
const orderRoutes = require("./public/order.routes");
const wishlistRoutes = require("./public/wishlist.routes");
const reviewRoutes = require("./public/review.routes");

const adminRoutes = require("./admin/index");

// Public and Customer Routes
router.use("/public/auth", authRoutes);
router.use("/public/products", productRoutes);
router.use("/public/categories", categoryRoutes);
router.use("/public/cart", cartRoutes);
router.use("/public/orders", orderRoutes);
router.use("/public/wishlist", wishlistRoutes);
router.use("/public/reviews", reviewRoutes);

// Admin Routes
router.use("/admin", adminRoutes);

module.exports = router;
