export interface CmsSection {
  [key: string]: any;
}

export interface CmsLabelMap {
  [section: string]: CmsSection;
}

export const DEFAULT_CHECKOUT_LABELS: CmsLabelMap = {

  'checkout-badge': {
    title: 'SECURE CHECKOUT (const)'
  },

  'checkout-title': {
    title: 'Complete Your Order (const)'
  },

  'checkout-subtitle': {
    title: 'Enter your delivery details and choose your preferred payment method. (const)'
  },

  'secure-checkout': {
    title: '🔒 Secure Checkout (const)'
  },

  'order-success': {
    title: 'Order Placed Successfully! (const)'
  },

  'customer-information': {
    title: 'Customer Information (const)'
  },

  'delivery-address': {
    title: 'Delivery Address (const)'
  },

  'payment-method': {
    title: 'Payment Method (const)'
  },

  'cash-on-delivery': {
    title: 'Cash on Delivery (const)'
  },

  'online-payment': {
    title: 'Online Payment (const)'
  },

  'upi': {
    title: 'UPI (const)'
  },

  'card': {
    title: 'Credit / Debit Card (const)'
  },

  'netbanking': {
    title: 'Net Banking (const)'
  },

  'wallet': {
    title: 'Wallet (const)'
  },

  'order-summary': {
    title: 'Order Summary (const)'
  },

  'subtotal': {
    title: 'Subtotal (const)'
  },

  'delivery': {
    title: 'Delivery (const)'
  },

  'free': {
    title: 'FREE (const)'
  },

  'total': {
    title: 'Total (const)'
  },

  'place-order': {
    title: 'Place Order (const)'
  },

  'continue-shopping': {
    title: 'Continue Shopping (const)'
  }

};