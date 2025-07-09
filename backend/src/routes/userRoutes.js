const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Public routes (no authentication required)
router.get('/health', (req, res) => UserController.healthCheck(req, res));
router.post('/register', (req, res) => UserController.register(req, res));
router.post('/login', (req, res) => UserController.login(req, res));

// Protected routes (authentication required)
router.get('/profile', authenticateToken, (req, res) => UserController.getProfile(req, res));
router.put('/profile', authenticateToken, (req, res) => UserController.updateProfile(req, res));

// Admin routes (admin role required)
router.get('/all', authenticateToken, (req, res) => UserController.getAllUsers(req, res));

module.exports = router; 