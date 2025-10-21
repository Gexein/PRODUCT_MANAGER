import type { Product } from "../lib";

export const isValidFormFieldTitle = (title: Product['title']) :boolean=> {
return !!title?.trim()
}

export const isValidFormFieldPrice = (price: Product['price']) :boolean=> {
return typeof price === 'number' && price >= 0
}