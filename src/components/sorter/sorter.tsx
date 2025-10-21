import { SORT_OPTIONS, useAppDispatch, useAppSelector, type SortOption } from "../../shared/lib";
import { setSort } from "../../shared/lib/store/productsSlice";
import { isValidSortOption } from "../../shared/utils/isValidSort";
import styles from './sorter.module.css';



export function Sorter() {
    const dispatch = useAppDispatch()
    const {sortBy} = useAppSelector(state => state.products)

    const changeSort = (newSort: SortOption) => {
        if(!isValidSortOption(newSort)) {
            throw new Error('Сортировка по данной категории невозможна!')
        }
        dispatch(setSort(newSort))
    }
return(

    <select defaultValue={sortBy} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => changeSort(event.target.value as SortOption)} className={styles.select}>
        <option value={SORT_OPTIONS.DEFAULT}>По-умолчанию</option>
        <option value={SORT_OPTIONS.PRICE_UP}>Цена ↑</option>
        <option value={SORT_OPTIONS.PRICE_DOWN}>Цена ↓</option>
        <option value={SORT_OPTIONS.RATING}>Рейтинг</option>
    </select>
)

}