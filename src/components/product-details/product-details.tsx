import type { ProductDetailsProps } from "./product-details.props";
import styles from './product-details.module.css';
import { useEffect, useMemo, useState } from "react";
import { isValidFormFieldPrice, isValidFormFieldTitle } from "../../shared/utils/isValidFormField";
import { useAppDispatch, useAppSelector} from "../../shared/lib";
import { deleteProduct, updateProduct } from "../../shared/lib/store/productsSlice";
import EditIconSrc from '../../assets/pencil.svg';
import AcceptIconSrc from '../../assets/accept.svg';
import CancelIconSrc from '../../assets/cancel.svg';


export function ProductDetails({productID, hideProduct}: ProductDetailsProps) {
    const {items} = useAppSelector(state => state.products)

     const product = useMemo(() => {
        return  items.find(item => item.id === productID)
    }, [items, productID])

 const [isEditTitle, setIsEditTitle] = useState(false)
 const [titleValue, setTitleValue] = useState('')
 const [isEditPrice, setIsEditPrice] = useState(false)
 const [priceValue, setPriceValue] = useState(0)
 const dispatch = useAppDispatch()

useEffect(() => {
    if(product) {
    setTitleValue(product.title)
    setPriceValue(product.price)
    }
}, [product])

 const setNewTitle = () => {
    if(product && titleValue && isValidFormFieldTitle(titleValue)) {
dispatch(updateProduct({
    id: product.id,
    changes: {
        title: titleValue.trim()
    }
            }))
        }
        setIsEditTitle(false)
 }

 const setNewPrice = () => {
    if(product && priceValue && isValidFormFieldPrice(priceValue)) {
        dispatch(updateProduct({
    id: product.id,
    changes: {
        price: priceValue
    }
            }))
    }
    setIsEditPrice(false)
 }

 const undoneChangeTitle = () => {
    setIsEditTitle(false)
    if(product?.title) {
        setTitleValue(product.title)
    }
 }

 const undoneChangePrice = () => {
    setIsEditPrice(false)
    if(product?.price) {
        setPriceValue(product.price)
    }
 }

 const closeDetails = () => {
    hideProduct()
    setIsEditPrice(false)
    setIsEditTitle(false)
 }

 const deleteItem = () => {
    if(productID) {
        dispatch(deleteProduct(productID))
    }
    hideProduct()
    setIsEditPrice(false)
    setIsEditTitle(false)
 }


    if(!product) return null

    return (
        <div className={styles.modal}>
            <div className={styles.details}>
                <button className={styles.closeButton} onClick={closeDetails}>Закрыть</button>
                <button className={styles.deleteButton} onClick={deleteItem}>Удалить товар</button>
                <img src={product.image} height={200} className={styles.img}/>
                 {isEditTitle
                  ? <div className={styles.editWrapper}>
                  <input type="text" value={titleValue} onInput={(event: React.ChangeEvent<HTMLInputElement>) => setTitleValue(event.target.value)} className={styles.input}/>
                    <button><img src={AcceptIconSrc} alt="Подтвердить" height={40} onClick={setNewTitle}/></button>
                    <button><img src={CancelIconSrc} alt="Отмена" height={40} onClick={() => undoneChangeTitle()}/></button>
                  </div>
                  : <div className={styles.editWrapper}>
                    <h2 className={styles.h2}>Название: {product.title}</h2>
                    <button><img src={EditIconSrc} alt="Изменить" height={40}  onClick={() => setIsEditTitle(true)}/></button>
                    <div className=""></div>
                  </div>
                  }
                  {isEditPrice
                  ? <div className={styles.editWrapper}>
                  <input type="number" value={priceValue} onInput={(event: React.ChangeEvent<HTMLInputElement>) => setPriceValue(+event.target.value)} className={styles.input}/>
                      <button><img src={AcceptIconSrc} alt="Подтвердить" height={40} onClick={setNewPrice}/></button>
                    <button><img src={CancelIconSrc} alt="Отмена" height={40} onClick={() => undoneChangePrice()}/></button>
                  </div>
                  :  <div className={styles.editWrapper}>
                  <span>Цена: {product.price}$</span>
                  <button><img src={EditIconSrc} alt="Изменить" height={40} onClick={() => setIsEditPrice(true)}/></button>
                  <div className=""></div>
                  </div>
                  }
            
                  <span>Категория: {product.category}</span>
                  <span>Рейтинг: {product.rating.rate}</span>
                 <p className={styles.description}>Описание: {product.description}</p>
            </div>
        </div>
        
    )



}