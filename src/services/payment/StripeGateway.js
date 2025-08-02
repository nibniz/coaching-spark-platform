const IPaymentGateway = require('./IPaymentGateway');
const stripe = require('stripe');

/**
 * Stripe Payment Gateway Implementation
 * Implements the IPaymentGateway interface for Stripe
 */
class StripeGateway extends IPaymentGateway {
  constructor(config) {
    super(config);
    this.stripe = stripe(config.secretKey);
    this.webhookSecret = config.webhookSecret;
  }

  /**
   * Create a payment intent
   */
  async createPaymentIntent(paymentData) {
    try {
      const { amount, currency, description, metadata, customerId } = paymentData;
      
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: this.formatAmount(amount, currency),
        currency: currency.toLowerCase(),
        description,
        metadata,
        customer: customerId,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        success: true,
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        metadata: paymentIntent.metadata
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  }

  /**
   * Confirm a payment
   */
  async confirmPayment(paymentId, confirmationData) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.confirm(
        paymentId,
        confirmationData
      );

      return {
        success: true,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  }

  /**
   * Capture a payment
   */
  async capturePayment(paymentId, amount) {
    try {
      const captureData = amount ? { amount: this.formatAmount(amount, 'usd') } : {};
      const paymentIntent = await this.stripe.paymentIntents.capture(paymentId, captureData);

      return {
        success: true,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  }

  /**
   * Refund a payment
   */
  async refundPayment(paymentId, amount, reason) {
    try {
      const refundData = {
        payment_intent: paymentId,
        reason: reason || 'requested_by_customer'
      };

      if (amount) {
        refundData.amount = this.formatAmount(amount, 'usd');
      }

      const refund = await this.stripe.refunds.create(refundData);

      return {
        success: true,
        refundId: refund.id,
        amount: refund.amount,
        currency: refund.currency,
        status: refund.status,
        reason: refund.reason
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentId) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentId);

      return {
        success: true,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata,
        created: paymentIntent.created
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  }

  /**
   * Create a customer
   */
  async createCustomer(customerData) {
    try {
      const { email, name, phone, metadata } = customerData;
      
      const customer = await this.stripe.customers.create({
        email,
        name,
        phone,
        metadata
      });

      return {
        success: true,
        customerId: customer.id,
        email: customer.email,
        name: customer.name,
        created: customer.created
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  }

  /**
   * Create a payment method
   */
  async createPaymentMethod(paymentMethodData) {
    try {
      const paymentMethod = await this.stripe.paymentMethods.create(paymentMethodData);

      return {
        success: true,
        paymentMethodId: paymentMethod.id,
        type: paymentMethod.type,
        card: paymentMethod.card,
        billing_details: paymentMethod.billing_details
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  }

  /**
   * Validate webhook signature
   */
  async validateWebhook(payload, signature) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        this.webhookSecret
      );
      return { success: true, event };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get supported currencies
   */
  getSupportedCurrencies() {
    return [
      'usd', 'eur', 'gbp', 'cad', 'aud', 'jpy', 'chf', 'sek', 'nok', 'dkk',
      'pln', 'czk', 'huf', 'ron', 'bgn', 'hrk', 'rub', 'try', 'brl', 'mxn',
      'ars', 'clp', 'cop', 'pen', 'uyu', 'inr', 'sgd', 'hkd', 'twd', 'krw',
      'thb', 'myr', 'idr', 'php', 'vnd', 'ngn', 'zar', 'egp', 'mad', 'aed'
    ];
  }

  /**
   * Get supported payment methods
   */
  getSupportedPaymentMethods() {
    return [
      'card', 'bank_transfer', 'sepa_debit', 'sofort', 'ideal', 'bancontact',
      'eps', 'giropay', 'p24', 'alipay', 'wechat_pay', 'afterpay_clearpay'
    ];
  }

  /**
   * Format amount for Stripe (convert to cents)
   */
  formatAmount(amount, currency) {
    // Stripe expects amounts in smallest currency unit (cents for USD)
    const multiplier = this.getCurrencyMultiplier(currency);
    return Math.round(amount * multiplier);
  }

  /**
   * Unformat amount from Stripe (convert from cents)
   */
  unformatAmount(amount, currency) {
    const multiplier = this.getCurrencyMultiplier(currency);
    return amount / multiplier;
  }

  /**
   * Get currency multiplier for formatting
   */
  getCurrencyMultiplier(currency) {
    // Zero-decimal currencies (JPY, etc.)
    const zeroDecimalCurrencies = ['jpy', 'bif', 'clp', 'djf', 'gnf', 'kmf', 'krw', 'mga', 'pyg', 'rwf', 'ugx', 'vnd', 'vuv', 'xaf', 'xof', 'xpf'];
    
    if (zeroDecimalCurrencies.includes(currency.toLowerCase())) {
      return 1;
    }
    
    return 100; // Most currencies use 2 decimal places
  }
}

module.exports = StripeGateway; 