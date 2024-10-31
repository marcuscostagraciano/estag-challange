import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    THUNK_STATUS,
    INITIAL_STATE,
    HTTP_STATUS,
} from "../../utils/constants";

import OrderItem from "../../services/OrderItem";

const sliceName = "orderItem";
const initialState = {
    orderItem: [],
    ...INITIAL_STATE,
};

const orderItemSlice = createSlice({
    name: sliceName,
    initialState,

    reducers: {
        addProductToCart: {
            // The action will be returned 'prepared' from the 'prepare' action
            reducer (state, action) {
                state.orderItem.push(action.payload);
            },
            // Use this 'prepare' action to handle the input validation?
            prepare (code, name, tax) {
                return {
                    payload: {
                        code,
                        name,
                        tax,
                    },
                };
            },
        },
    },

    extraReducers (builder) {
        builder
            // Fetch
            .addCase(asyncFetchOrderItems.pending, (state) => {
                state.status = THUNK_STATUS.LOADING;
            })
            .addCase(asyncFetchOrderItems.rejected, (state, action) => {
                state.status = THUNK_STATUS.IDLE;
                state.error = action.error.message;
            })
            .addCase(asyncFetchOrderItems.fulfilled, (state, action) => {
                state.status = THUNK_STATUS.SUCCEDDED;
                state.orderItem = state.orderItem.concat(action.payload);
            })
            //     // Delete
            //     .addCase(asyncDeleteOrderItem.pending, (state, action) => {
            //         state.status = THUNK_STATUS.LOADING;
            //     })
            //     .addCase(asyncDeleteOrderItem.rejected, (state, action) => {
            //         state.status = THUNK_STATUS.IDLE;
            //         state.error = action.payload;
            //     })
            //     .addCase(asyncDeleteOrderItem.fulfilled, (state, action) => {
            //         state.error = null;
            //         state.status = THUNK_STATUS.SUCCEDDED;
            //         state.orderItem = state.orderItem.filter(
            //             (category) => category.code !== action.payload
            //         );
            //     })
            // Post
            .addCase(asyncPostOrderItem.pending, (state, action) => {
                state.status = THUNK_STATUS.LOADING;
            })
            .addCase(asyncPostOrderItem.rejected, (state, action) => {
                state.status = THUNK_STATUS.FAILED;
                state.error = action.payload;
            })
            .addCase(asyncPostOrderItem.fulfilled, (state, action) => {
                state.error = null;
                state.status = THUNK_STATUS.SUCCEDDED;
                state.orderItem.push(action.payload);
            });
    },
});

// Selectors
const selectAllOrderItem = (state) => state.orderItem.orderItem;
const getOrderItemError = (state) => state.orderItem.error;
const getOrderItemStatus = (state) => state.orderItem.status;

// AsyncThunks
const asyncFetchOrderItems = createAsyncThunk(
    `${sliceName}/fetchOrderItem`,
    async () => {
        try {
            const data = await OrderItem.getOrderItems();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
);
// const asyncDeleteOrderItem = createAsyncThunk(
//     `${sliceName}/deleteOrderItem`,
//     async (categoryID, { getState, rejectWithValue }) => {
//         const productsInState = getState().products.products;
//         const isUsed = !!productsInState.find(
//             (product) => product.category_code === categoryID
//         );

//         if (!isUsed) {
//             try {
//                 const data = await OrderItem.deleteOrderItem(categoryID);
//                 return categoryID;
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//         alert("OrderItem being used");
//         return rejectWithValue(HTTP_STATUS.FORBIDDEN);
//     }
// );
const asyncPostOrderItem = createAsyncThunk(
    `${sliceName}/postOrderItem`,
    async (orderItemData, { getState, rejectWithValue }) => {
        const orderData = orderItemData.order;
        const productData = orderItemData.product;

        try {
            const data = await OrderItem.postOrderItem(
                orderData.code,
                productData.code,
                productData.amount
            );

            return data;
        } catch (error) {
            console.error(error);
            alert("Something went wrong! Please reenter your inputs!");
            return rejectWithValue(HTTP_STATUS.FORBIDDEN);
        }
    }
);

export default orderItemSlice.reducer;
export const { addProductToCart } = orderItemSlice.actions;
export {
    // Selectors
    selectAllOrderItem,
    getOrderItemError,
    getOrderItemStatus,
    // Thunks
    asyncFetchOrderItems,
    // asyncDeleteOrderItem,
    asyncPostOrderItem,
};
