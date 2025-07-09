const pool = require('../config/database');

// 🎓 Learning: Models handle all database operations
// - Keep database logic separate from business logic
// - Reusable across different controllers
// - Easy to test and maintain

class UserModel {
  // Find user by email (for login)
  static async findByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);
      return result.rows[0]; // Return first matching user
    } catch (error) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }

  // Create new user (for registration)
  static async create(userData) {
    try {
      const { email, password_hash, first_name, last_name, role, avatar_url } = userData;
      
      const query = `
        INSERT INTO users (email, password_hash, first_name, last_name, role, avatar_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      
      const values = [email, password_hash, first_name, last_name, role, avatar_url];
      const result = await pool.query(query, values);
      
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  // Get all users (for admin purposes)
  static async findAll() {
    try {
      const query = 'SELECT id, email, first_name, last_name, role, is_verified, created_at FROM users';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw new Error(`Error finding all users: ${error.message}`);
    }
  }

  // Update user
  static async update(id, updateData) {
    try {
      const { first_name, last_name, avatar_url } = updateData;
      
      const query = `
        UPDATE users 
        SET first_name = $1, last_name = $2, avatar_url = $3, updated_at = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *
      `;
      
      const values = [first_name, last_name, avatar_url, id];
      const result = await pool.query(query, values);
      
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  // Delete user
  static async delete(id) {
    try {
      const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

module.exports = UserModel; 