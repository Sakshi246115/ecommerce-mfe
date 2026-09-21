export interface CmsSection {
  [key: string]: any;
}

export interface CmsLabelMap {
  [section: string]: CmsSection;
}

export const DEFAULT_HEADER_LABELS: CmsLabelMap = {

  'logo': {
    title: 'My Ecommerce (const)'
  },

  'home': {
    title: 'Home (const)'
  },

  'products': {
    title: 'Products (const)'
  },

  'cart': {
    title: 'Cart (const)'
  },

  'orders': {
    title: 'Orders (const)'
  },

  'welcome': {
    title: 'Welcome (const)'
  },

  'user': {
    title: 'User (const)'
  },

  'my-profile': {
    title: 'My Profile (const)'
  },

  'my-orders': {
    title: 'My Orders (const)'
  },

  'logout': {
    title: 'Logout (const)'
  }

};