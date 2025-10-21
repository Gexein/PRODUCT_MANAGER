import styles from './product-list.module.css';
import { Product} from "../index";
import type { ProductListProps } from "./product-list.props";

export function ProductList({products, showProduct}: ProductListProps) {
return (

    <div className={styles.products}>
     <h2>Товары &#40;{products.length}&#41;</h2>
      <ul className={styles.list}>
       {products.map(item => (
          <Product product={item} key={item.id} onClick={() => showProduct(item.id)}/>
        ))}
   </ul>
    </div>
)

}