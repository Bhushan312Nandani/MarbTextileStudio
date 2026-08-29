const express = require("express");
const router = express.Router();
const authController = require("../../controllers/public/auth.controller");
const requireAuth = require("../../middleware/auth.middleware");

// Public endpoints
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

// Protected endpoint
router.get("/me", requireAuth, authController.getProfile);

module.exports = router;
