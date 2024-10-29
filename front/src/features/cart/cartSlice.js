import { createSlice } from "@reduxjs/toolkit";

const sliceName = "cart";
const initialState = {
    products: [],
    tax: 0,
    total: 0,
};

const cartSlice = createSlice({
    name: sliceName,
    initialState,

    reducers: {},
});

// Selectors
const selectAllProducts = state => state.cart.products;
const selectTax = state => state.cart.tax;
const selectTotalValue = state => state.cart.total;

export default cartSlice.reducer;
export {
    // Selectors
    selectAllProducts,
    selectTax,
    selectTotalValue
};
