export const PRODUCT_CATEGORIES = {
  ALL: 'All',
  ELECTRONICS: 'Electronics',
  FASHION: 'Fashion',
  HOME: 'Home'
} as const;


export const PRODUCT_SORT_OPTIONS = {
  DEFAULT: 'default',
  PRICE_LOW_TO_HIGH: 'price-low-high',
  PRICE_HIGH_TO_LOW: 'price-high-low',
  RATING_HIGH_TO_LOW: 'rating-high-low'
} as const;


export const PRODUCT_PRICE_FILTERS = {
  ALL: 'All Prices',
  UNDER_1000: 'Under ₹1,000',
  FROM_1000_TO_5000: '₹1,000 - ₹5,000',
  FROM_5000_TO_20000: '₹5,000 - ₹20,000',
  ABOVE_20000: 'Above ₹20,000'
} as const;


export const PRODUCT_RATING_FILTERS = {
  ALL: 'All Ratings',
  FOUR_AND_ABOVE: '4 ⭐ & above',
  THREE_AND_ABOVE: '3 ⭐ & above',
  TWO_AND_ABOVE: '2 ⭐ & above'
} as const;


export const PRODUCT_FILTER_LIMITS = {
  MIN_PRICE: 0,
  MAX_PRICE: 100000,
  MIN_RATING: 0,
  MAX_RATING: 5
} as const;