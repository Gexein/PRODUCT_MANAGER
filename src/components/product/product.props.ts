import type { Product } from "../../shared/lib";

export interface ProductProps extends React.HTMLAttributes<HTMLLIElement> {
    product: Product
}