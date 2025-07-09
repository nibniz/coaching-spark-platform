const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

class UserController {
  // Register a new user
  static async register(req, res) {
    try {
      const { email, password, first_name, last_name, role = 'user' } = req.body;
      
      // Validate required fields
      if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required: email, password, first_name, last_name'
        });
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address'
        });
      }
      
      // Validate password strength
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
      }
      
      // Create user in database
      const newUser = await UserModel.createUser({
        email,
        password,
        first_name,
        last_name,
        role
      });
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            role: newUser.role,
            created_at: newUser.created_at
          },
          token
        }
      });
      
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.message === 'User with this email already exists') {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Internal server error during registration'
      });
    }
  }
  
  // Login user
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Validate required fields
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
      
      // Verify password
      const isPasswordValid = await UserModel.verifyPassword(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
      
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            created_at: user.created_at
          },
          token
        }
      });
      
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during login'
      });
    }
  }
  
  // Get user profile
  static async getProfile(req, res) {
    try {
      const userId = req.user.userId;
      
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      res.json({
        success: true,
        data: { user }
      });
      
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching profile'
      });
    }
  }
  
  // Update user profile
  static async updateProfile(req, res) {
    try {
      const userId = req.user.userId;
      const { first_name, last_name, bio, phone } = req.body;
      
      // Validate that at least one field is provided
      if (!first_name && !last_name && !bio && !phone) {
        return res.status(400).json({
          success: false,
          message: 'At least one field must be provided for update'
        });
      }
      
      const updatedUser = await UserModel.updateProfile(userId, {
        first_name,
        last_name,
        bio,
        phone
      });
      
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: { user: updatedUser }
      });
      
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while updating profile'
      });
    }
  }
  
  // Get all users (admin only)
  static async getAllUsers(req, res) {
    try {
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Admin privileges required.'
        });
      }
      
      const users = await UserModel.getAllUsers();
      
      res.json({
        success: true,
        data: { users }
      });
      
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching users'
      });
    }
  }
  
  // Health check
  static async healthCheck(req, res) {
    res.json({
      success: true,
      message: 'User service is healthy',
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = UserController; 