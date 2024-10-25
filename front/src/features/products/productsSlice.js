import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { INITIAL_STATE, THUNK_STATUS } from "../../utils/constants";

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

export default productsSlice.reducer;
export {
    // Selectors
    selectAllProducts,
    getProductsError,
    getProductsStatus,
    // AsyncThunks
    asyncFetchProducts,
};
