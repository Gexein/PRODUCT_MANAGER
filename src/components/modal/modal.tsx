import type { ModalProps } from "./modal.props";
import styles from './modal.module.css';
import { AddProductForm } from "../index";


export function Modal({isVisible, closeModal}: ModalProps) {
    if(!isVisible) {return null}

    return (
        <div className={styles.modal}>
            <button onClick={() => closeModal()} className={styles.closeButton}>Закрыть</button>
            <div className="empty"></div>
             <AddProductForm closeModal={closeModal}/>
        </div>
    )
}   