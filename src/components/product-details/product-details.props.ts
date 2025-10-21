import type { Product } from "../../shared/lib";

export interface ProductDetailsProps {
    productID: Product['id'] | null;
    hideProduct: () => void
}