const PaymentService = require('../services/PaymentService');
const { authenticateToken } = require('../middleware/auth');
const pool = require('../config/database');

/**
 * Payment Controller
 * Handles HTTP requests for payment operations
 */
class PaymentController {
  /**
   * Create a payment intent for session booking
   */
  static async createPaymentIntent(req, res) {
    try {
      const { sessionId, mentorId, amount, currency, description, metadata } = req.body;
      const userId = req.user.id; // From auth middleware

      // Validate required fields
      if (!sessionId || !mentorId || !amount) {
        return res.status(400).json({
          success: false,
          message: 'Session ID, mentor ID, and amount are required'
        });
      }

      // Validate amount
      if (amount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Amount must be greater than 0'
        });
      }

      // Create payment intent
      const result = await PaymentService.createSessionPayment({
        sessionId,
        mentorId,
        userId,
        amount,
        currency: currency || 'USD',
        description,
        metadata
      });

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.error
        });
      }

      res.status(201).json({
        success: true,
        message: 'Payment intent created successfully',
        data: {
          paymentId: result.paymentId,
          clientSecret: result.clientSecret,
          amount: result.amount,
          currency: result.currency,
          status: result.status,
          gateway: result.gateway
        }
      });

    } catch (error) {
      console.error('Payment intent creation error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create payment intent',
        error: error.message
      });
    }
  }

  /**
   * Confirm a payment
   */
  static async confirmPayment(req, res) {
    try {
      const { paymentId, confirmationData } = req.body;
      const userId = req.user.id;

      if (!paymentId) {
        return res.status(400).json({
          success: false,
          message: 'Payment ID is required'
        });
      }

      // Verify payment belongs to user
      const paymentRecord = await PaymentService.getPaymentRecord(paymentId);
      if (!paymentRecord || paymentRecord.user_id !== userId) {
        return res.status(404).json({
          success: false,
          message: 'Payment not found or unauthorized'
        });
      }

      // Confirm payment
      const result = await PaymentService.confirmPayment(paymentId, confirmationData);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.error
        });
      }

      res.json({
        success: true,
        message: 'Payment confirmed successfully',
        data: {
          paymentId: result.paymentId,
          status: result.status,
          amount: result.amount,
          currency: result.currency
        }
      });

    } catch (error) {
      console.error('Payment confirmation error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to confirm payment',
        error: error.message
      });
    }
  }

  /**
   * Get payment status
   */
  static async getPaymentStatus(req, res) {
    try {
      const { paymentId } = req.params;
      const userId = req.user.id;

      // Verify payment belongs to user
      const paymentRecord = await PaymentService.getPaymentRecord(paymentId);
      if (!paymentRecord || paymentRecord.user_id !== userId) {
        return res.status(404).json({
          success: false,
          message: 'Payment not found or unauthorized'
        });
      }

      // Get payment status
      const result = await PaymentService.getPaymentStatus(paymentId);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.error
        });
      }

      res.json({
        success: true,
        data: {
          paymentId: result.paymentId,
          status: result.status,
          amount: result.amount,
          currency: result.currency,
          gatewayStatus: result.gatewayStatus
        }
      });

    } catch (error) {
      console.error('Payment status check error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get payment status',
        error: error.message
      });
    }
  }

  /**
   * Process refund
   */
  static async processRefund(req, res) {
    try {
      const { paymentId } = req.params;
      const { amount, reason } = req.body;
      const userId = req.user.id;

      // Verify payment belongs to user
      const paymentRecord = await PaymentService.getPaymentRecord(paymentId);
      if (!paymentRecord || paymentRecord.user_id !== userId) {
        return res.status(404).json({
          success: false,
          message: 'Payment not found or unauthorized'
        });
      }

      // Check if payment is completed
      if (paymentRecord.payment_status !== 'completed') {
        return res.status(400).json({
          success: false,
          message: 'Only completed payments can be refunded'
        });
      }

      // Process refund
      const result = await PaymentService.processRefund(paymentId, amount, reason);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.error
        });
      }

      res.json({
        success: true,
        message: 'Refund processed successfully',
        data: {
          refundId: result.refundId,
          amount: result.amount,
          status: result.status
        }
      });

    } catch (error) {
      console.error('Refund processing error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process refund',
        error: error.message
      });
    }
  }

  /**
   * Get available payment gateways
   */
  static async getPaymentGateways(req, res) {
    try {
      const gateways = PaymentService.getAllGatewayInfo();

      res.json({
        success: true,
        data: gateways
      });

    } catch (error) {
      console.error('Gateway info error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get payment gateway information',
        error: error.message
      });
    }
  }

  /**
   * Handle payment webhooks
   */
  static async handleWebhook(req, res) {
    try {
      const { gateway } = req.params;
      const payload = req.body;
      const signature = req.headers['stripe-signature'] || req.headers['paypal-signature'];

      // Validate webhook signature
      const paymentGateway = PaymentService.getGateway(gateway);
      const validation = await paymentGateway.validateWebhook(payload, signature);

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: 'Invalid webhook signature'
        });
      }

      const event = validation.event;

      // Handle different webhook events
      switch (event.type) {
        case 'payment_intent.succeeded':
        case 'payment_intent.payment_failed':
          await PaymentService.handlePaymentWebhook(event);
          break;
        case 'charge.refunded':
          await PaymentService.handleRefundWebhook(event);
          break;
        default:
          console.log(`Unhandled webhook event: ${event.type}`);
      }

      res.json({ success: true, message: 'Webhook processed successfully' });

    } catch (error) {
      console.error('Webhook processing error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process webhook',
        error: error.message
      });
    }
  }

  /**
   * Get user's payment history
   */
  static async getPaymentHistory(req, res) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10 } = req.query;

      const offset = (page - 1) * limit;

      const query = `
        SELECT p.*, s.scheduled_at, s.duration_minutes, u.first_name, u.last_name
        FROM payments p
        LEFT JOIN sessions s ON p.session_id = s.id
        LEFT JOIN users u ON p.mentor_id = u.id
        WHERE p.user_id = $1
        ORDER BY p.created_at DESC
        LIMIT $2 OFFSET $3
      `;

      const result = await pool.query(query, [userId, limit, offset]);

      res.json({
        success: true,
        data: {
          payments: result.rows,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: result.rows.length
          }
        }
      });

    } catch (error) {
      console.error('Payment history error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get payment history',
        error: error.message
      });
    }
  }
}

module.exports = PaymentController; 