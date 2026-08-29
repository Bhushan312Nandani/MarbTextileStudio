const express = require("express");
const router = express.Router();
const requireAuth = require("../../middleware/auth.middleware");
const requireRole = require("../../middleware/role.middleware");

const productRoutes = require("./product.routes");
const categoryRoutes = require("./category.routes");
const orderRoutes = require("./order.routes");
const statsRoutes = require("./stats.routes");
const userRoutes = require("./user.routes");

// All admin routes require authentication and ADMIN or SELLER role
router.use(requireAuth);
router.use(requireRole("ADMIN", "SELLER"));

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/orders", orderRoutes);
router.use("/stats", statsRoutes);
router.use("/users", userRoutes);

module.exports = router;
