import { createSlice } from "@reduxjs/toolkit";

const sliceName = "cart";
const initialState = {
    products: [],
    tax: 0,
    total: 0,
    lastRemovedProduct: {}
};

const cartSlice = createSlice({
    name: sliceName,
    initialState,

    reducers: {
        addProduct (state, payload) {
            const product = payload.payload.product;

            const taxPayed = (product.total * payload.payload.tax) / 100;
            state.tax += taxPayed;
            state.total += product.total + taxPayed;
            state.products.push({ ...product, taxPayed });
        },
        removeProduct (state, payload) {
            const positionToBeRemoved = payload.payload;
            const lastRemovedProduct = state.products.splice(positionToBeRemoved, 1)[0];
            const totalPayed = lastRemovedProduct.total + lastRemovedProduct.taxPayed;

            state.lastRemovedProduct = lastRemovedProduct;
            state.tax -= lastRemovedProduct.taxPayed;
            state.total -= totalPayed;
        },
        clearCart (state) {
            state.products = [];
            state.tax = 0;
            state.total = 0;
            state.lastRemovedProduct = {};
        },
    },
});

// Selectors
const selectAllProductsFromCart = (state) => state.cart.products;
const selectTax = (state) => state.cart.tax;
const selectTotalValue = (state) => state.cart.total;
const selectLastRemovedProduct = (state) => state.cart.lastRemovedProduct ?? {};

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export {
    // Selectors
    selectAllProductsFromCart,
    selectTax,
    selectTotalValue,
    selectLastRemovedProduct,
};
