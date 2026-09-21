export interface CmsSection {
  [key: string]: any;
}

export interface CmsLabelMap {
  [section: string]: CmsSection;
}

export const DEFAULT_PRODUCT_LABELS: CmsLabelMap = {

  'heading': {
    title: 'Discover Amazing Products (const)',
    description:
      'Find quality products at the best prices (const) .'
  },

  'search': {
    title: 'Search products'
  },

  'empty-state': {
    title: 'No products found',
    description:
      'Try changing your search or filters.'
  }

};