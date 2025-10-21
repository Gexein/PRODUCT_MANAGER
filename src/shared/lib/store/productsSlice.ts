import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { API } from "../../../api/products";
import { UNREACHED_ARRAY_IDX, type FormValues, type Product, type ProductsState, type SortOption } from "../index";

export const initialState: ProductsState = {
  items: [],
  categories: [],
  loading: false,
  error: null,
  sortBy: 'default',
};


export const getProducts = createAsyncThunk('products/getAll', API.getProductsList)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },

    addProduct: (state, action: PayloadAction<FormValues>) => {
      const newProduct = {
        ...action.payload,
        rating: {rate: 0},
        id: Date.now()
      }
      state.items.push(newProduct);
    },

    updateProduct: (state, action: PayloadAction<{id: Product['id'], changes: Partial<Product>}>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== UNREACHED_ARRAY_IDX) {
        state.items[index] = { ...state.items[index], ...action.payload.changes };
      }
    },

    deleteProduct: (state, action: PayloadAction<Product['id']>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки продуктов!';
      })
  },
});

export const { setSort, addProduct, updateProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;