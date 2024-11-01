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

    reducers: {
        addProduct (state, payload) {
            const product = payload.payload;

            const taxPayed = (product.total * product.category.tax) / 100;
            state.tax += taxPayed;
            state.total += product.total + taxPayed;
            state.products.push({ ...product, taxPayed });
        },
        removeProduct (state, payload) {
            const positionToBeRemoved = payload.payload;
            const lastRemovedProduct = state.products.splice(
                positionToBeRemoved,
                1
            )[0];
            const totalPayed =
                lastRemovedProduct.total + lastRemovedProduct.taxPayed;

            state.tax -= lastRemovedProduct.taxPayed;
            state.total -= totalPayed;
        },
        clearCart (state) {
            state.products = [];
            state.tax = 0;
            state.total = 0;
        },
    },
});

// Selectors
const selectAllProductsFromCart = (state) => state.cart.products;
const selectTax = (state) => state.cart.tax;
const selectTotalValue = (state) => state.cart.total;

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export {
    // Selectors
    selectAllProductsFromCart,
    selectTax,
    selectTotalValue,
};
