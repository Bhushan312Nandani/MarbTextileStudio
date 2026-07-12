const express = require('express');
const router = express.Router();
const authController = require('../../controllers/public/auth.controller');

// POST register user (Intern: Member 4 - Implement Logic in auth.service.js)
router.post('/register', authController.register);

// POST login user (Intern: Member 4 - Implement Logic in auth.service.js)
router.post('/login', authController.login);

module.exports = router;
