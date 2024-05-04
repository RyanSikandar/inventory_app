import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteAProduct, getProduct, getProducts, updateAProduct } from './productService';
import { createProduct } from './productService';
import { toast } from 'react-toastify';
const initialState = {
    products: [],
    product: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    totalStoreValue: 0,
    outOfStock: 0,
    category: []
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

export const getAllProducts = createAsyncThunk(
    'products/getAll',
    async (_, thunkAPI) => {
        try {
            return await getProducts();
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id, thunkAPI) => {
        try {
            return await deleteAProduct(id);
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getProductById = createAsyncThunk(
    'products/getProduct',
    async (id, thunkAPI) => {
        try {
            return await getProduct(id);
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//Update a product 
export const updateProduct = createAsyncThunk(
    'products/update',
    async ({id,formData}, thunkAPI) => {
        try {
            
            return await updateAProduct(id, formData);
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }

)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        CALC_STORE_VALUE: (state, action) => {
            const products = action.payload
            const array = []
            products.map((product) => {
                const { price, quantity } = product
                const total = price * quantity
                return array.push(total)
            })
            const totalStoreValue = array.reduce((a, b) => { return a + b }, 0)
            state.totalStoreValue = totalStoreValue

        },
        CALC_OUT_OF_STOCK: (state, action) => {
            const products = action.payload
            const outOfStock = products.filter((product) => product.quantity == 0).length
            state.outOfStock = outOfStock
        },
        CALC_CATEGORY: (state, action) => {
            const products = action.payload
            const array = []
            products.map((product) => {
                const { category } = product

                return array.push(category)
            });
            const uniqueCategory = [...new Set(array)]
            state.category = uniqueCategory
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


        builder.addCase(getAllProducts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.products = (action.payload)


        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
            toast.error(action.payload)
        })

        builder.addCase(deleteProduct.pending, (state, action) => {
            state.isLoading = true

        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            toast.success("Product Deleted Successfully")

        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
            toast.error(action.payload)
        })

        builder.addCase(getProductById.pending, (state, action) => {
            state.isLoading = true
        }
        )
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.product = action.payload
        })
        builder.addCase(getProductById.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
            toast.error(action.payload)
        })

        builder.addCase(updateProduct.pending, (state, action) => {
            state.isLoading = true
        }
        )
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            toast.success("Product Updated Successfully")
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
            toast.error(action.payload)
        })




    }
});

export const { CALC_STORE_VALUE, CALC_OUT_OF_STOCK, CALC_CATEGORY } = productSlice.actions
export const selectIsLoading = (state) => state.product.isLoading
export const selectTotalStoreValue = (state) => state.product.totalStoreValue
export const selectOutOfStock = (state) => state.product.outOfStock
export const selectCategory = (state) => state.product.category
export const selectProduct = (state) => state.product.product

export default productSlice.reducer