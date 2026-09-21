export interface CmsSection {

  [key: string]: any;

}

export interface CmsLabelMap {

  [section: string]: CmsSection;

}

export const DEFAULT_ORDERS_LABELS: CmsLabelMap = {

  'orders-badge': {
    title: 'MY ACCOUNT (const)'
  },

  'orders-title': {
    title: 'My Orders (const)'
  },

  'orders-subtitle': {
    title: 'View your recent orders and order details. (const)'
  },

  'empty-title': {
    title: 'No Orders Yet (const)'
  },

  'empty-description': {
    title: "You haven't placed any orders yet. (const)"
  },

  'order-id': {
    title: 'ORDER ID (const)'
  },

  'order-date': {
    title: 'ORDER DATE (const)'
  },

  'quantity': {
    title: 'Quantity (const)'
  },

  'price': {
    title: 'Price (const)'
  },

  'payment': {
    title: 'Payment (const)'
  },

  'delivery': {
    title: 'Delivery (const)'
  },

  'total-amount': {
    title: 'Total Amount (const)'
  },

  'delivery-address': {
    title: '📍 Delivery Address (const)'
  },

  'clear-history': {
    title: 'Clear Order History (const)'
  },

  'cash-on-delivery': {
    title: 'Cash on Delivery (const)'
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

  'online-payment': {
    title: 'Online Payment (const)'
  }

};