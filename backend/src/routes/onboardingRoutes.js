const express = require('express');
const OnboardingController = require('../controllers/onboardingController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get onboarding questions (public endpoint)
router.get('/questions', OnboardingController.getOnboardingQuestions);

// Get onboarding status (requires authentication)
router.get('/status', authMiddleware, OnboardingController.getOnboardingStatus);

// Submit onboarding questionnaire (requires authentication)
router.post('/submit', authMiddleware, OnboardingController.submitOnboarding);

module.exports = router; 