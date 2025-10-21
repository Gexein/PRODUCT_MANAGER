import type { Product } from "../../shared/lib";

export interface ProductListProps {
    products: Product[];
    showProduct: (productID: Product['id']) => void
}