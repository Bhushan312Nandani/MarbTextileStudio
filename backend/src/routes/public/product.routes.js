const express = require('express');
const router = express.Router();

// GET all products (Intern: Member 2 - Implement Logic)
router.get('/', (req, res) => {
    res.status(200).json({ message: "Product List - To be implemented" });
});

// GET single product (Intern: Member 2 - Implement Logic)
router.get('/:id', (req, res) => {
    res.status(200).json({ message: `Product details for ID: ${req.params.id} - To be implemented` });
});

module.exports = router;
