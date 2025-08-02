const express = require('express');
const PaymentController = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * Payment Routes
 * All routes require authentication
 */

// Create payment intent for session booking
router.post('/create-intent', authenticateToken, PaymentController.createPaymentIntent);

// Confirm payment
router.post('/confirm', authenticateToken, PaymentController.confirmPayment);

// Get payment status
router.get('/status/:paymentId', authenticateToken, PaymentController.getPaymentStatus);

// Process refund
router.post('/refund/:paymentId', authenticateToken, PaymentController.processRefund);

// Get available payment gateways
router.get('/gateways', PaymentController.getPaymentGateways);

// Get user's payment history
router.get('/history', authenticateToken, PaymentController.getPaymentHistory);

// Webhook endpoints (no authentication required)
router.post('/webhook/:gateway', PaymentController.handleWebhook);

module.exports = router; 