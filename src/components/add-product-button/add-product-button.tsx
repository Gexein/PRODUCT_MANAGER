import styles from './add-product-button.module.css';
import type { AddProductButtonProps } from './add-product-button.props';

export function AddProductButton({openModal,className, ...props}: AddProductButtonProps) {
    const classList = className ? `${styles.button} ${className}` : styles.button

    return(
        <button className={classList} onClick={() => openModal()} {...props}>
        Добавить товар
        </button>
    )
}