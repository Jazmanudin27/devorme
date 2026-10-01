const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Public routes
router.post('/login', authController.login);

// Protected routes (membutuhkan Bearer Token)
router.get('/profile', verifyToken, authController.getProfile);

module.exports = router;
