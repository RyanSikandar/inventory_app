import authReducer from './features/auth/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/products/productSlice'



export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer
    }
})