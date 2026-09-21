export interface CmsSection {
  [key: string]: any;
}

export interface CmsLabelMap {
  [section: string]: CmsSection;
}

export const DEFAULT_HOME_LABELS: CmsLabelMap = {

  'welcome-badge': {
    badge: '✨ Welcome to My Ecommerce (Conastant)'
  },

  'heading': {
    title: 'Everything You Need (Const),',
    heading: 'Everything You Need, (Const)',
    subdescription: 'All in One Place.',
    description:
      'Discover quality products at amazing prices. Shop electronics, fashion and home essentials.'
  },

  'categories': {
    badge: 'EXPLORE',
    title: 'Shop by Category',
    description:
      'Find everything you need from our popular categories.'
  },

  'electronics': {
    title: 'Electronics',
    description:
      'Smartphones, laptops, headphones and more.',
    button: 'Shop Electronics →'
  },

  'fashion': {
    title: 'Fashion',
    description:
      'Discover the latest fashion and trends.',
    button: 'Shop Fashion →'
  },

  'home-category': {
    title: 'Home',
    description:
      'Make your home comfortable and beautiful.',
    button: 'Shop Home →'
  },

  'features': {
    'fast-delivery': 'Fast Delivery',
    'fast-delivery-description':
      'Quick and reliable delivery.',

    'secure-payment': 'Secure Payment',
    'secure-payment-description':
      'Your payment is always protected.',

    'quality-products': 'Quality Products',
    'quality-products-description':
      'Products selected for you.'
  }
};