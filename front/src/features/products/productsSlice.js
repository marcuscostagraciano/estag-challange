import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    HTTP_STATUS,
    INITIAL_STATE,
    THUNK_STATUS,
} from "../../utils/constants";

import Products from "../../services/Products";

const sliceName = "products";
const initialState = {
    products: [],
    ...INITIAL_STATE,
};

const productsSlice = createSlice({
    name: sliceName,
    initialState,

    reducers: {},
    extraReducers (builder) {
        builder
            // Fetch
            .addCase(asyncFetchProducts.pending, (state) => {
                state.status = THUNK_STATUS.LOADING;
            })
            .addCase(asyncFetchProducts.fulfilled, (state, action) => {
                state.status = THUNK_STATUS.SUCCEDDED;
                state.products = state.products.concat(action.payload);
            })
            .addCase(asyncFetchProducts.rejected, (state, action) => {
                state.status = THUNK_STATUS.FAILED;
                state.error = action.error.message;
            })
            // Delete
            .addCase(asyncDeleteProduct.pending, (state, action) => {
                state.status = THUNK_STATUS.LOADING;
            })
            .addCase(asyncDeleteProduct.rejected, (state, action) => {
                state.status = THUNK_STATUS.IDLE;
                state.error = action.payload;
            })
            .addCase(asyncDeleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (product) => product.code !== action.payload
                );
            })
            // Post
            .addCase(asyncPostProduct.pending, (state, action) => {
                state.status = THUNK_STATUS.LOADING;
            })
            .addCase(asyncPostProduct.rejected, (state, action) => {
                state.status = THUNK_STATUS.FAILED;
                state.error = action.payload;
            })
            .addCase(asyncPostProduct.fulfilled, (state, action) => {
                state.error = null;
                state.status = THUNK_STATUS.SUCCEDDED;
                state.products.push(action.payload);
            });
    },
});

// Selectors
const selectAllProducts = (state) => state.products.products;
const getProductsError = (state) => state.products.error;
const getProductsStatus = (state) => state.products.status;

// AsyncThunks
const asyncFetchProducts = createAsyncThunk(
    `${sliceName}/fetchProducts`,
    async () => {
        try {
            const data = await Products.getProducts();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
);
const asyncDeleteProduct = createAsyncThunk(
    `${sliceName}/deleteProduct`,
    async (productID, { getState, rejectWithValue }) => {
        try {
            const data = await Products.deleteProduct(productID);
            return productID;
        } catch (error) {
            console.error(error);
        }
    }
);
const asyncPostProduct = createAsyncThunk(
    `${sliceName}/postProduct`,
    async (productData, { getState, rejectWithValue }) => {
        const productsInState = getState().products.products;

        const name = productData.name;
        const amount = productData.amount;
        const price = productData.price;
        const category_code = productData.category;

        const isProductNameUsed = !!productsInState.find(
            (product) => product.name === name
        );
        const isAmountValid = !!Number(amount) && 0 < amount;
        const isPriceValid = !!Number(price) && 0 < price;

        if (!isProductNameUsed && isAmountValid && isPriceValid) {
            try {
                const data = await Products.postProduct(
                    name,
                    amount,
                    price,
                    category_code
                );
                return data;
            } catch (error) {
                console.error(error);
            }
        }

        alert("Something went wrong! Please reenter your inputs!");
        return rejectWithValue(HTTP_STATUS.FORBIDDEN);
    }
);

export default productsSlice.reducer;
export {
    // Selectors
    selectAllProducts,
    getProductsError,
    getProductsStatus,
    // AsyncThunks
    asyncFetchProducts,
    asyncDeleteProduct,
    asyncPostProduct,
};
