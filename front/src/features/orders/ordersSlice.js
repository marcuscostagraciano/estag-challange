import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    THUNK_STATUS,
    INITIAL_STATE,
    HTTP_STATUS,
} from "../../utils/constants";

import Orders from "../../services/Orders";

const sliceName = "orders";
const initialState = {
    orders: [],
    ...INITIAL_STATE,
};

const ordersSlice = createSlice({
    name: sliceName,
    initialState,

    reducers: {},

    extraReducers (builder) {
        builder
            // Fetch
            .addCase(asyncFetchOrders.pending, (state) => {
                state.status = THUNK_STATUS.LOADING;
            })
            .addCase(asyncFetchOrders.rejected, (state, action) => {
                state.status = THUNK_STATUS.IDLE;
                state.error = action.error.message;
            })
            .addCase(asyncFetchOrders.fulfilled, (state, action) => {
                state.status = THUNK_STATUS.SUCCEDDED;
                state.orders = state.orders.concat(action.payload);
            })
            //     // Delete
            //     .addCase(asyncDeleteOrder.pending, (state, action) => {
            //         state.status = THUNK_STATUS.LOADING;
            //     })
            //     .addCase(asyncDeleteOrder.rejected, (state, action) => {
            //         state.status = THUNK_STATUS.IDLE;
            //         state.error = action.payload;
            //     })
            //     .addCase(asyncDeleteOrder.fulfilled, (state, action) => {
            //         state.error = null;
            //         state.status = THUNK_STATUS.SUCCEDDED;
            //         state.orders = state.orders.filter(
            //             (category) => category.code !== action.payload
            //         );
            //     })
            // Post
            .addCase(asyncPostOrder.pending, (state, action) => {
                state.status = THUNK_STATUS.LOADING;
            })
            .addCase(asyncPostOrder.rejected, (state, action) => {
                state.status = THUNK_STATUS.FAILED;
                state.error = action.payload;
            })
            .addCase(asyncPostOrder.fulfilled, (state, action) => {
                state.error = null;
                state.status = THUNK_STATUS.SUCCEDDED;
                state.orders.push(action.payload);
            });
    },
});

// Selectors
const selectAllOrders = (state) => state.orders.orders;
const getOrdersError = (state) => state.orders.error;
const getOrdersStatus = (state) => state.orders.status;

// AsyncThunks;
const asyncFetchOrders = createAsyncThunk(
    `${sliceName}/fetchOrders`,
    async () => {
        try {
            const data = await Orders.getOrders();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
);
// const asyncDeleteOrder = createAsyncThunk(
//     `${sliceName}/deleteOrder`,
//     async (categoryID, { getState, rejectWithValue }) => {
//         const productsInState = getState().products.products;
//         const isUsed = !!productsInState.find(
//             (product) => product.category_code === categoryID
//         );

//         if (!isUsed) {
//             try {
//                 const data = await Categories.deleteOrder(categoryID);
//                 return categoryID;
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//         alert("Order being used");
//         return rejectWithValue(HTTP_STATUS.FORBIDDEN);
//     }
// );
const asyncPostOrder = createAsyncThunk(
    `${sliceName}/postOrder`,
    async (orderData = null, { rejectWithValue }) => {
        try {
            const data = await Orders.postOrder();
            return data;
        } catch (error) {
            console.error(error);
            alert("Something went wrong! Please reenter your inputs!");
            return rejectWithValue(HTTP_STATUS.FORBIDDEN);
        }
    }
);

export default ordersSlice.reducer;
export const { addProductToCart } = ordersSlice.actions;
export {
    // Selectors
    selectAllOrders,
    getOrdersError,
    getOrdersStatus,
    // Thunks
    asyncFetchOrders,
    asyncPostOrder,
};
