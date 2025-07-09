const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// 🎓 Learning: Routes define API endpoints
// - Map HTTP methods (GET, POST, PUT, DELETE) to controller functions
// - Apply middleware for authentication and authorization
// - Define the URL structure of your API

// Public routes (no authentication required)
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Protected routes (authentication required)
router.get('/profile', authenticateToken, UserController.getProfile);

// Admin routes (authentication + role authorization required)
router.get('/all', authenticateToken, authorizeRole(['mentor', 'user']), UserController.getAllUsers);

module.exports = router; 