import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from '../features/categories/categoriesSlice';
import productsReducer from '../features/products/productsSlice';
import orderItemReducer from '../features/orderItem/orderItemSlice';
import ordersReducer from '../features/orders/ordersSlice';

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productsReducer,
        orderItem: orderItemReducer,
        orders: ordersReducer,
    }
});
