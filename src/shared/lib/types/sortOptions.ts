
export const SORT_OPTIONS = {
  DEFAULT: 'default',
  PRICE_UP: 'price_up', 
  PRICE_DOWN: 'price_down',
  RATING: 'rating',
} as const;

export type SortOption = typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS];

