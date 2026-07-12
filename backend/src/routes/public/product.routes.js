const express = require('express');
const router = express.Router();
const productController = require('../../controllers/public/product.controller');

// GET all products (Intern: Member 2 - Implement Logic in product.service.js)
router.get('/', productController.listProducts);

// GET search (Intern: Member 2 - Implement Logic in product.service.js)
router.get('/search', productController.searchProducts);

// GET single product (Intern: Member 2 - Implement Logic in product.service.js)
router.get('/:id', productController.getProduct);

module.exports = router;
