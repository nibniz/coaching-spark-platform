const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class UserModel {
  // Create a new user
  static async createUser(userData) {
    const { email, password, first_name, last_name, role = 'user' } = userData;
    
    try {
      // Check if user already exists
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );
      
      if (existingUser.rows.length > 0) {
        throw new Error('User with this email already exists');
      }
      
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      // Insert new user
      const result = await pool.query(
        `INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
         RETURNING id, email, first_name, last_name, role, created_at`,
        [email, hashedPassword, first_name, last_name, role]
      );
      
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  // Find user by email (for login)
  static async findByEmail(email) {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }
  
  // Find user by ID
  static async findById(id) {
    try {
      const result = await pool.query(
        'SELECT id, email, first_name, last_name, role, created_at, updated_at FROM users WHERE id = $1',
        [id]
      );
      
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }
  
  // Update user profile
  static async updateProfile(id, updateData) {
    const { first_name, last_name, bio, phone } = updateData;
    
    try {
      const result = await pool.query(
        `UPDATE users 
         SET first_name = COALESCE($1, first_name),
             last_name = COALESCE($2, last_name),
             bio = COALESCE($3, bio),
             phone = COALESCE($4, phone),
             updated_at = NOW()
         WHERE id = $5
         RETURNING id, email, first_name, last_name, role, bio, phone, created_at, updated_at`,
        [first_name, last_name, bio, phone, id]
      );
      
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }
  
  // Get all users (for admin purposes)
  static async getAllUsers() {
    try {
      const result = await pool.query(
        'SELECT id, email, first_name, last_name, role, created_at FROM users ORDER BY created_at DESC'
      );
      
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
  
  // Delete user
  static async deleteUser(id) {
    try {
      const result = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING id',
        [id]
      );
      
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }
  
  // Verify password
  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = UserModel; 