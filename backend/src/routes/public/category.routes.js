const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/public/category.controller');

// GET all categories (Intern: Member 2 - Implement Logic in category.service.js)
router.get('/', categoryController.listCategories);

module.exports = router;
