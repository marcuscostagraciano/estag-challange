import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from '../features/categories/categoriesSlice';
import productsReducer from '../features/products/productsSlice';
import orderItemReducer from '../features/orderItem/orderItemSlice';
import ordersReducer from '../features/orders/ordersSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        categories: categoriesReducer,
        products: productsReducer,
        orderItem: orderItemReducer,
        orders: ordersReducer,
    }
});
