import { AddProductButton, Hero, Modal, ProductDetails, ProductList, Sorter} from "./components"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector, type Product } from "./shared/lib"
import { getProducts } from "./shared/lib/store/productsSlice"




function App() {
const [productID, setProductID] = useState<null | Product['id']>(null)
const [isModalVisible, setIsModalVisible] = useState(false)
const dispatch = useAppDispatch()
const {items, loading, error, sortBy} = useAppSelector(state => state.products)

useEffect(() => {
    dispatch(getProducts())
}, [dispatch])

const productsList = useMemo(() => {
    switch(sortBy) {
        case 'price_down':
             return  [...items].sort((a, b) => b.price - a.price)
        case 'price_up':
             return  [...items].sort((a, b) => a.price - b.price)
        case 'rating':
             return  [...items].sort((a,b) => b.rating.rate - a.rating.rate)
        default:
             return items
    }

}, [items, sortBy])

const showProduct = (productID: Product['id']) => {
setProductID(productID)
}

const hideProduct = () => {
     setProductID(null)
}


  return (
    <main>
      {loading 
      ? <div className="loader"></div>
      : error
      ? <div className="error">{error}</div>
       :<>
       <Hero/>
       <Modal isVisible={isModalVisible} closeModal={() => setIsModalVisible(false)}/>
       <ProductDetails productID={productID} hideProduct={hideProduct}/>
       <Sorter/>
       <AddProductButton openModal={() => setIsModalVisible(true)}/>
      <ProductList products={productsList} showProduct={showProduct}/>
        </>
      }
       
     </main>
  )
}

export default App
