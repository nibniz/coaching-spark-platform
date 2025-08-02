const StripeGateway = require('./payment/StripeGateway');
const PayPalGateway = require('./payment/PayPalGateway');
const pool = require('../config/database');

/**
 * Payment Service
 * Handles all payment-related business logic
 * Uses payment gateway abstraction for provider flexibility
 */
class PaymentService {
  constructor() {
    this.gateways = new Map();
    this.defaultGateway = process.env.DEFAULT_PAYMENT_GATEWAY || 'stripe';
    this.initializeGateways();
  }

  /**
   * Initialize payment gateways based on configuration
   */
  initializeGateways() {
    // Initialize Stripe
    if (process.env.STRIPE_SECRET_KEY) {
      this.gateways.set('stripe', new StripeGateway({
        secretKey: process.env.STRIPE_SECRET_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
      }));
    }

    // Initialize PayPal
    if (process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET) {
      this.gateways.set('paypal', new PayPalGateway({
        clientId: process.env.PAYPAL_CLIENT_ID,
        clientSecret: process.env.PAYPAL_CLIENT_SECRET,
        environment: process.env.PAYPAL_ENVIRONMENT || 'sandbox'
      }));
    }

    // Add more gateways here as needed
    // this.gateways.set('razorpay', new RazorpayGateway(config));
    // this.gateways.set('square', new SquareGateway(config));
  }

  /**
   * Get the active payment gateway
   */
  getGateway(gatewayName = null) {
    const gateway = gatewayName || this.defaultGateway;
    const paymentGateway = this.gateways.get(gateway);
    
    if (!paymentGateway) {
      throw new Error(`Payment gateway '${gateway}' not configured`);
    }
    
    return paymentGateway;
  }

  /**
   * Create a payment intent for a session booking
   */
  async createSessionPayment(sessionData) {
    try {
      const {
        sessionId,
        mentorId,
        userId,
        amount,
        currency = 'USD',
        description,
        metadata = {}
      } = sessionData;

      // Get the payment gateway
      const gateway = this.getGateway();

      // Create payment intent
      const paymentData = {
        amount,
        currency,
        description: description || `Coaching session with mentor`,
        metadata: {
          ...metadata,
          sessionId,
          mentorId,
          userId,
          type: 'session_booking'
        }
      };

      const result = await gateway.createPaymentIntent(paymentData);

      if (!result.success) {
        throw new Error(result.error);
      }

      // Store payment record in database
      const paymentRecord = await this.createPaymentRecord({
        sessionId,
        mentorId,
        userId,
        amount,
        currency,
        gateway: gateway.constructor.name.toLowerCase().replace('gateway', ''),
        gatewayPaymentId: result.paymentIntentId,
        status: 'pending',
        metadata: result.metadata
      });

      return {
        success: true,
        paymentId: paymentRecord.id,
        gatewayPaymentId: result.paymentIntentId,
        clientSecret: result.clientSecret,
        amount: result.amount,
        currency: result.currency,
        status: result.status,
        gateway: gateway.constructor.name.toLowerCase().replace('gateway', '')
      };

    } catch (error) {
      console.error('Payment creation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Confirm a payment
   */
  async confirmPayment(paymentId, confirmationData) {
    try {
      // Get payment record from database
      const paymentRecord = await this.getPaymentRecord(paymentId);
      if (!paymentRecord) {
        throw new Error('Payment record not found');
      }

      // Get the gateway used for this payment
      const gateway = this.getGateway(paymentRecord.gateway);

      // Confirm payment with gateway
      const result = await gateway.confirmPayment(
        paymentRecord.gateway_payment_id,
        confirmationData
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      // Update payment record
      await this.updatePaymentStatus(paymentId, 'completed', {
        gatewayStatus: result.status,
        confirmedAt: new Date()
      });

      // Update session status
      await this.updateSessionStatus(paymentRecord.session_id, 'confirmed');

      return {
        success: true,
        paymentId,
        status: 'completed',
        amount: result.amount,
        currency: result.currency
      };

    } catch (error) {
      console.error('Payment confirmation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Process payment refund
   */
  async processRefund(paymentId, amount, reason) {
    try {
      // Get payment record
      const paymentRecord = await this.getPaymentRecord(paymentId);
      if (!paymentRecord) {
        throw new Error('Payment record not found');
      }

      // Get the gateway
      const gateway = this.getGateway(paymentRecord.gateway);

      // Process refund
      const result = await gateway.refundPayment(
        paymentRecord.gateway_payment_id,
        amount,
        reason
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      // Create refund record
      await this.createRefundRecord({
        paymentId,
        amount: result.amount,
        reason,
        gatewayRefundId: result.refundId,
        status: result.status
      });

      return {
        success: true,
        refundId: result.refundId,
        amount: result.amount,
        status: result.status
      };

    } catch (error) {
      console.error('Refund processing error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentId) {
    try {
      const paymentRecord = await this.getPaymentRecord(paymentId);
      if (!paymentRecord) {
        throw new Error('Payment record not found');
      }

      const gateway = this.getGateway(paymentRecord.gateway);
      const result = await gateway.getPaymentStatus(paymentRecord.gateway_payment_id);

      return {
        success: true,
        paymentId,
        status: result.status,
        amount: result.amount,
        currency: result.currency,
        gatewayStatus: result.status
      };

    } catch (error) {
      console.error('Payment status check error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Create payment record in database
   */
  async createPaymentRecord(paymentData) {
    const {
      sessionId,
      mentorId,
      userId,
      amount,
      currency,
      gateway,
      gatewayPaymentId,
      status,
      metadata
    } = paymentData;

    const query = `
      INSERT INTO payments (session_id, mentor_id, user_id, amount, currency, payment_method, payment_status, transaction_id, metadata)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [
      sessionId,
      mentorId,
      userId,
      amount,
      currency,
      gateway,
      status,
      gatewayPaymentId,
      JSON.stringify(metadata)
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Get payment record from database
   */
  async getPaymentRecord(paymentId) {
    const query = 'SELECT * FROM payments WHERE id = $1';
    const result = await pool.query(query, [paymentId]);
    return result.rows[0];
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(paymentId, status, additionalData = {}) {
    const query = `
      UPDATE payments 
      SET payment_status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `;
    await pool.query(query, [status, paymentId]);
  }

  /**
   * Update session status
   */
  async updateSessionStatus(sessionId, status) {
    const query = `
      UPDATE sessions 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `;
    await pool.query(query, [status, sessionId]);
  }

  /**
   * Create refund record
   */
  async createRefundRecord(refundData) {
    // You might want to create a separate refunds table
    // For now, we'll update the payment record
    const query = `
      UPDATE payments 
      SET payment_status = 'refunded', updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `;
    await pool.query(query, [refundData.paymentId]);
  }

  /**
   * Get available payment gateways
   */
  getAvailableGateways() {
    return Array.from(this.gateways.keys());
  }

  /**
   * Get gateway capabilities
   */
  getGatewayCapabilities(gatewayName) {
    const gateway = this.getGateway(gatewayName);
    return {
      currencies: gateway.getSupportedCurrencies(),
      paymentMethods: gateway.getSupportedPaymentMethods(),
      name: gatewayName
    };
  }

  /**
   * Get all gateway information for API response
   */
  getAllGatewayInfo() {
    const gateways = [];
    
    for (const [name, gateway] of this.gateways) {
      gateways.push({
        id: name,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        description: `Accept payments with ${name.charAt(0).toUpperCase() + name.slice(1)}`,
        supportedCurrencies: gateway.getSupportedCurrencies(),
        supportedMethods: gateway.getSupportedPaymentMethods(),
        isEnabled: true,
        config: {
          publishableKey: name === 'stripe' ? process.env.STRIPE_PUBLISHABLE_KEY : null,
          supportedCurrencies: gateway.getSupportedCurrencies(),
          supportedMethods: gateway.getSupportedPaymentMethods()
        }
      });
    }
    
    return gateways;
  }
}

module.exports = new PaymentService(); 