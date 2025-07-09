const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🎓 Learning: Controllers handle HTTP requests and responses
// - Receive data from client (req)
// - Process the request using models
// - Send response back to client (res)
// - Handle errors and validation

class UserController {
  // Register a new user
  static async register(req, res) {
    try {
      const { email, password, first_name, last_name, role } = req.body;

      // 🎓 Learning: Input validation
      if (!email || !password || !first_name || !last_name || !role) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required'
        });
      }

      // Check if user already exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // 🎓 Learning: Password hashing for security
      const saltRounds = 10;
      const password_hash = await bcrypt.hash(password, saltRounds);

      // Create user
      const userData = {
        email,
        password_hash,
        first_name,
        last_name,
        role,
        avatar_url: `${first_name.charAt(0)}${last_name.charAt(0)}`
      };

      const newUser = await UserModel.create(userData);

      // 🎓 Learning: Don't send password hash in response
      const { password_hash: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: userWithoutPassword
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      // Find user by email
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // 🎓 Learning: Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // 🎓 Learning: Create JWT token for authentication
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Remove password from response
      const { password_hash: _, ...userWithoutPassword } = user;

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: userWithoutPassword,
          token
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get user profile
  static async getProfile(req, res) {
    try {
      // 🎓 Learning: req.user comes from authentication middleware
      const userId = req.user.userId;
      
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Remove password from response
      const { password_hash: _, ...userWithoutPassword } = user;

      res.json({
        success: true,
        data: userWithoutPassword
      });

    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get all users (admin only)
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      
      res.json({
        success: true,
        data: users
      });

    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
}

module.exports = UserController; 