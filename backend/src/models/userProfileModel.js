const pool = require('../config/database');

class UserProfileModel {
  // Create or update user profile
  static async createOrUpdateProfile(userId, profileData) {
    const { 
      job_title, 
      experience_level, 
      areas_of_interest, 
      primary_goals, 
      industry, 
      company_size 
    } = profileData;
    
    try {
      // Check if profile already exists
      const existingProfile = await pool.query(
        'SELECT id FROM user_profiles WHERE user_id = $1',
        [userId]
      );
      
      if (existingProfile.rows.length > 0) {
        // Update existing profile
        const result = await pool.query(
          `UPDATE user_profiles 
           SET job_title = $1,
               experience_level = $2,
               areas_of_interest = $3,
               primary_goals = $4,
               industry = $5,
               company_size = $6,
               is_onboarding_completed = true,
               updated_at = NOW()
           WHERE user_id = $7
           RETURNING *`,
          [job_title, experience_level, areas_of_interest, primary_goals, industry, company_size, userId]
        );
        
        return result.rows[0];
      } else {
        // Create new profile
        const result = await pool.query(
          `INSERT INTO user_profiles (
            user_id, job_title, experience_level, areas_of_interest, 
            primary_goals, industry, company_size, is_onboarding_completed
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, true)
          RETURNING *`,
          [userId, job_title, experience_level, areas_of_interest, primary_goals, industry, company_size]
        );
        
        return result.rows[0];
      }
    } catch (error) {
      throw error;
    }
  }
  
  // Get user profile by user ID
  static async getByUserId(userId) {
    try {
      const result = await pool.query(
        'SELECT * FROM user_profiles WHERE user_id = $1',
        [userId]
      );
      
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }
  
  // Check if user has completed onboarding
  static async isOnboardingCompleted(userId) {
    try {
      const result = await pool.query(
        'SELECT is_onboarding_completed FROM user_profiles WHERE user_id = $1',
        [userId]
      );
      
      return result.rows[0]?.is_onboarding_completed || false;
    } catch (error) {
      throw error;
    }
  }
  
  // Delete user profile
  static async deleteProfile(userId) {
    try {
      const result = await pool.query(
        'DELETE FROM user_profiles WHERE user_id = $1 RETURNING id',
        [userId]
      );
      
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserProfileModel; 