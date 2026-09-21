export interface CmsSection {

  [key: string]: any;

}

export interface CmsLabelMap {

  [section: string]: CmsSection;

}

export const DEFAULT_CART_LABELS: CmsLabelMap = {

  'cart-badge': {

    text: '🛒 SHOPPING CART (const)'

  },

  'cart-title': {

    title: 'My Cart (const)'

  },

  'cart-subtitle': {

    text: 'Review your selected products before checkout. (const)'

  },

  'empty-cart': {

    title: 'Your cart is empty (const)',

    description: "You haven't added any products yet. (const)",

    button: 'Continue Shopping (const)'

  },

  'order-summary': {

    title: 'Order Summary (const)',

    checkout: 'Proceed to Checkout → (const)',

    continueShopping: '← Continue Shopping (const)'

  },

  'quantity': {

    label: 'Quantity (const)'

  },

  'item-total': {

    label: 'Item Total (const)',

    remove: '🗑 Remove (const)'

  },

  'clear-cart': {

    text: '🗑 Clear Cart (const)'

  }

};