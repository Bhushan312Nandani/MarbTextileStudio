const express = require('express');
const router = express.Router();

// GET all categories (Intern: Member 2 - Implement Logic)
router.get('/', (req, res) => {
    res.status(200).json({ message: "Category List - To be implemented" });
});

module.exports = router;
