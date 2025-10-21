import { SORT_OPTIONS, type SortOption } from "../lib";

export const isValidSortOption = (value: string): boolean => {
  return Object.values(SORT_OPTIONS).includes(value as SortOption);
};