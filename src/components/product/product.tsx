import type { ProductProps } from "./product.props";
import styles from './product.module.css';
import defaultImgSrc from '../../assets/noimage.png';

export function Product({product, className, ...props}: ProductProps) {

    const picURL = product.image ? product.image : defaultImgSrc
    const classList = className ? `${styles.product} ${className}` : `${styles.product}`

    return (
    <li {...props} className={classList}>
     <img src={picURL} alt={product.title} height={100}/>
    <div className={styles.content}>
         <div className={styles.price}>Цена: {product.price} $</div>
         <div className={styles.rating}>Рейтинг: {product.rating.rate}</div>
     <div className={styles.category}>Категория: {product.category}</div>
     <h3 className={styles.title}>{product.title}</h3>
     <p className={styles.description}>{product.description}</p>
    </div>
    </li>)
}