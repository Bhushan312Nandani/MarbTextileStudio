const express = require("express");
const router = express.Router();
const userController = require("../../controllers/admin/user.controller");

router.get("/", userController.listUsers);
router.patch("/:id/status", userController.toggleStatus);

module.exports = router;
