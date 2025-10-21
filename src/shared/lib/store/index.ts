import { configureStore } from "@reduxjs/toolkit";
import Reducer from './productsSlice';


export const store = configureStore({
    reducer: {products: Reducer}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch