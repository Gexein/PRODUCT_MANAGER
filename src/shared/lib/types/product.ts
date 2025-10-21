import type { SortOption } from "./sortOptions";

export interface Product {
  image: string;
  title: string;
  price: number;
  category: string;
  rating: {
    rate: number;
  };
  id: number;
  description: string;
}

export interface ProductsState {
  items: Product[];
  categories: Product['category'][];
  loading: boolean;
  error: string | null;
  sortBy: SortOption;
}