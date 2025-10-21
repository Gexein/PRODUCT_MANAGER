import { useForm } from "react-hook-form";
import { useAppDispatch, type FormValues } from "../../shared/lib";
import styles from './add-product-form.module.css';
import { useEffect } from "react";
import { addProduct } from "../../shared/lib/store/productsSlice";
import type { AddProductFormProps } from "./add-product-form.props";


export function AddProductForm({closeModal}: AddProductFormProps) {
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        reset,
        formState: { errors, isValid },
    } = useForm({ mode: 'onChange', criteriaMode: 'all', defaultValues: { title: '', price: 0, description: '', image: '' , category: ''} });


    const submitForm = (data: FormValues ) => {
        dispatch(addProduct(data))
        reset()
        closeModal()
    }
    const title = watch('title')
    const description = watch('description')
    const category = watch('category')


    useEffect(() => {
        trigger()
    }, [title, description, category])

    return(
               <form onSubmit={handleSubmit(submitForm)} className={styles.form} autoComplete="off">
            <fieldset className={styles.fieldset}>
                <label htmlFor="title" className={styles.label}>Название</label>
                <input type="text" className={styles.input} id="title" autoComplete="off" 
                    {...register('title', {
                        required: true,
                        pattern: {
                            message: 'Буквы, цифры, длина: 1-50',
                            value: /^[a-zA-Zа-яА-ЯёЁ0-9\s]{1,50}$/
                        }
                    })}
                />
                <span className={styles.error__container}><>{errors.title && errors.title.message}</></span>
            </fieldset>

            <fieldset className={styles.fieldset}>
                <label htmlFor="price" className={styles.label}>Цена</label>
                <input type="number" className={styles.input} id="price" autoComplete="off"
                    {...register('price', {
                        required: true,
                    })} />
                <span className={styles.error__container}><>{errors.price && errors.price.message}</></span>
            </fieldset>

            <fieldset className={styles.fieldset}>
                <label htmlFor="description" className={styles.label}>Описание</label>
                <textarea  className={styles.textarea} id="description" 
                    {...register('description', {
                        required: true,
                        pattern: {
                           message: 'Буквы, цифры, длина: 1-100',
                            value: /^[a-zA-Zа-яА-ЯёЁ0-9\s]{1,100}$/
                        },
                    })} />
                <span className={styles.error__container}><>{errors.description && errors.description.message}</></span>
            </fieldset>

            <fieldset className={styles.fieldset}>
                <label htmlFor="imgLink" className={styles.label}>Ссылка на картинку</label>
                <input type="URL" className={styles.input} id="imgLink" autoComplete="off"
                    {...register('image', {
                          minLength: {
                               value: 1,
                         message: 'Минимальная длина: 1 символ'
                   },
                    })} />
                <span className={styles.error__container}><>{errors.image && errors.image.message}</></span>
            </fieldset>

            <fieldset className={styles.fieldset}>
                <label htmlFor="category" className={styles.label}>Категория</label>
                <input type="text" className={styles.input} id="category" autoComplete="off"
                    {...register('category', {
                        required: true,
                        pattern: {
                           message: 'Буквы, цифры, длина: 1-100',
                            value: /^[a-zA-Zа-яА-ЯёЁ0-9\s]{1,100}$/
                        },
                    })} />
                <span className={styles.error__container}><>{errors.description && errors.description.message}</></span>
            </fieldset>

            <button type="submit" className={styles.button}disabled={!isValid}>Создать товар</button>
        </form>
    )
}