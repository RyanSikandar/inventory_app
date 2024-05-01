import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { createProduct } from './productService';
import { toast } from 'react-toastify';
const initialState = {
    products: [],
    product: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

//Use createAsyncThunk to create new product
//States are Pending, Fulfilled, Rejected
export const createNewProduct = createAsyncThunk(
    'products/create',
    async (productData, thunkAPI) => {
        try {
            console.log(productData)
            return await createProduct(productData);
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        CALC_STORE_VALUE: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewProduct.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(createNewProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            console.log(action.payload)
            state.products.push(action.payload)
            toast.success("Product Created Successfully")

        })
        builder.addCase(createNewProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })

    }
});

export const { CALC_STORE_VALUE } = productSlice.actions
export const selectIsLoading = (state) => state.product.isLoading

export default productSlice.reducer