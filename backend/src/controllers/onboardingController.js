const UserProfileModel = require('../models/userProfileModel');

class OnboardingController {
  // Submit onboarding questionnaire
  static async submitOnboarding(req, res) {
    try {
      const userId = req.user.userId; // From JWT token
      const {
        job_title,
        experience_level,
        areas_of_interest,
        primary_goals,
        industry,
        company_size
      } = req.body;
      
      // Validate required fields
      if (!job_title || !experience_level || !areas_of_interest || !primary_goals) {
        return res.status(400).json({
          success: false,
          message: 'Please fill in all required fields'
        });
      }
      
      // Validate areas_of_interest is an array
      if (!Array.isArray(areas_of_interest) || areas_of_interest.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Please select at least one area of interest'
        });
      }
      
      // Create or update user profile
      const profile = await UserProfileModel.createOrUpdateProfile(userId, {
        job_title,
        experience_level,
        areas_of_interest,
        primary_goals,
        industry,
        company_size
      });
      
      res.status(200).json({
        success: true,
        message: 'Onboarding completed successfully',
        data: {
          profile: {
            id: profile.id,
            job_title: profile.job_title,
            experience_level: profile.experience_level,
            areas_of_interest: profile.areas_of_interest,
            primary_goals: profile.primary_goals,
            industry: profile.industry,
            company_size: profile.company_size,
            is_onboarding_completed: profile.is_onboarding_completed
          }
        }
      });
      
    } catch (error) {
      console.error('Onboarding submission error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during onboarding submission'
      });
    }
  }
  
  // Get onboarding status
  static async getOnboardingStatus(req, res) {
    try {
      const userId = req.user.userId;
      
      const isCompleted = await UserProfileModel.isOnboardingCompleted(userId);
      const profile = await UserProfileModel.getByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: {
          is_completed: isCompleted,
          profile: profile ? {
            id: profile.id,
            job_title: profile.job_title,
            experience_level: profile.experience_level,
            areas_of_interest: profile.areas_of_interest,
            primary_goals: profile.primary_goals,
            industry: profile.industry,
            company_size: profile.company_size,
            is_onboarding_completed: profile.is_onboarding_completed
          } : null
        }
      });
      
    } catch (error) {
      console.error('Get onboarding status error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while getting onboarding status'
      });
    }
  }
  
  // Get onboarding questions (static data)
  static async getOnboardingQuestions(req, res) {
    try {
      const questions = {
        experience_levels: [
          "Student",
          "Entry Level (0-2 years)",
          "Mid Level (3-5 years)",
          "Senior Level (6-10 years)",
          "Executive Level (10+ years)"
        ],
        areas_of_interest: [
          "Career Development",
          "Leadership & Management",
          "Entrepreneurship",
          "Product Management",
          "Software Engineering",
          "Data Science",
          "Marketing & Growth",
          "Sales & Business Development",
          "Design & UX",
          "Finance & Investing",
          "Operations & Strategy",
          "Personal Development",
          "Industry Transition",
          "Other"
        ],
        industries: [
          "Technology",
          "Healthcare",
          "Finance",
          "Education",
          "Retail",
          "Manufacturing",
          "Consulting",
          "Non-profit",
          "Government",
          "Media & Entertainment",
          "Real Estate",
          "Other"
        ],
        company_sizes: [
          "1-10 employees",
          "11-50 employees",
          "51-200 employees",
          "201-1000 employees",
          "1001-5000 employees",
          "5000+ employees"
        ]
      };
      
      res.status(200).json({
        success: true,
        data: questions
      });
      
    } catch (error) {
      console.error('Get onboarding questions error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while getting onboarding questions'
      });
    }
  }
}

module.exports = OnboardingController; 