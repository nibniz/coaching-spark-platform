/**
 * Abstract Payment Gateway Interface
 * This defines the contract that all payment providers must implement
 * Allows easy switching between different payment gateways
 */

class IPaymentGateway {
  /**
   * Initialize the payment gateway with configuration
   * @param {Object} config - Gateway configuration
   */
  constructor(config) {
    if (this.constructor === IPaymentGateway) {
      throw new Error('IPaymentGateway is an abstract class and cannot be instantiated');
    }
    this.config = config;
  }

  /**
   * Create a payment intent/session
   * @param {Object} paymentData - Payment details
   * @param {number} amount - Amount in cents/smallest currency unit
   * @param {string} currency - Currency code (USD, EUR, etc.)
   * @param {string} description - Payment description
   * @param {Object} metadata - Additional metadata
   * @returns {Promise<Object>} Payment intent/session data
   */
  async createPaymentIntent(paymentData) {
    throw new Error('createPaymentIntent method must be implemented');
  }

  /**
   * Confirm a payment
   * @param {string} paymentId - Payment ID from the gateway
   * @param {Object} confirmationData - Confirmation details
   * @returns {Promise<Object>} Confirmed payment data
   */
  async confirmPayment(paymentId, confirmationData) {
    throw new Error('confirmPayment method must be implemented');
  }

  /**
   * Capture a payment (for authorized payments)
   * @param {string} paymentId - Payment ID
   * @param {number} amount - Amount to capture
   * @returns {Promise<Object>} Captured payment data
   */
  async capturePayment(paymentId, amount) {
    throw new Error('capturePayment method must be implemented');
  }

  /**
   * Refund a payment
   * @param {string} paymentId - Payment ID
   * @param {number} amount - Amount to refund (optional, full refund if not specified)
   * @param {string} reason - Refund reason
   * @returns {Promise<Object>} Refund data
   */
  async refundPayment(paymentId, amount, reason) {
    throw new Error('refundPayment method must be implemented');
  }

  /**
   * Get payment status
   * @param {string} paymentId - Payment ID
   * @returns {Promise<Object>} Payment status data
   */
  async getPaymentStatus(paymentId) {
    throw new Error('getPaymentStatus method must be implemented');
  }

  /**
   * Create a customer
   * @param {Object} customerData - Customer information
   * @returns {Promise<Object>} Customer data
   */
  async createCustomer(customerData) {
    throw new Error('createCustomer method must be implemented');
  }

  /**
   * Create a payment method (card, bank account, etc.)
   * @param {Object} paymentMethodData - Payment method details
   * @returns {Promise<Object>} Payment method data
   */
  async createPaymentMethod(paymentMethodData) {
    throw new Error('createPaymentMethod method must be implemented');
  }

  /**
   * Validate webhook signature
   * @param {string} payload - Raw webhook payload
   * @param {string} signature - Webhook signature
   * @returns {boolean} True if signature is valid
   */
  async validateWebhook(payload, signature) {
    throw new Error('validateWebhook method must be implemented');
  }

  /**
   * Get supported currencies
   * @returns {Array<string>} List of supported currency codes
   */
  getSupportedCurrencies() {
    throw new Error('getSupportedCurrencies method must be implemented');
  }

  /**
   * Get supported payment methods
   * @returns {Array<string>} List of supported payment methods
   */
  getSupportedPaymentMethods() {
    throw new Error('getSupportedPaymentMethods method must be implemented');
  }

  /**
   * Convert amount to gateway format
   * @param {number} amount - Amount in dollars/cents
   * @param {string} currency - Currency code
   * @returns {number} Amount in gateway's expected format
   */
  formatAmount(amount, currency) {
    throw new Error('formatAmount method must be implemented');
  }

  /**
   * Convert amount from gateway format
   * @param {number} amount - Amount in gateway format
   * @param {string} currency - Currency code
   * @returns {number} Amount in standard format
   */
  unformatAmount(amount, currency) {
    throw new Error('unformatAmount method must be implemented');
  }
}

module.exports = IPaymentGateway; 