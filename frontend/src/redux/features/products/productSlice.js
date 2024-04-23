import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    products: [],
    product: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        CALC_STORE_VALUE: (state, action) => {

        }
    },
    extraReducers:(builder)=>{


    }
});

export const { CALC_STORE_VALUE} = productSlice.actions

export default productSlice.reducer