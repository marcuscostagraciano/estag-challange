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
                state.categories.push(action.payload);
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
            });
        //     // Delete
        //     .addCase(asyncDeleteCategory.pending, (state, action) => {
        //         state.status = THUNK_STATUS.LOADING;
        //     })
        //     .addCase(asyncDeleteCategory.rejected, (state, action) => {
        //         state.status = THUNK_STATUS.IDLE;
        //         state.error = action.payload;
        //     })
        //     .addCase(asyncDeleteCategory.fulfilled, (state, action) => {
        //         state.error = null;
        //         state.status = THUNK_STATUS.SUCCEDDED;
        //         state.categories = state.categories.filter(
        //             (category) => category.code !== action.payload
        //         );
        //     })
        //     // Post
        //     .addCase(asyncPostCategory.pending, (state, action) => {
        //         state.status = THUNK_STATUS.LOADING;
        //     })
        //     .addCase(asyncPostCategory.rejected, (state, action) => {
        //         state.status = THUNK_STATUS.FAILED;
        //         state.error = action.payload;
        //     })
        //     .addCase(asyncPostCategory.fulfilled, (state, action) => {
        //         state.error = null;
        //         state.status = THUNK_STATUS.SUCCEDDED;
        //         state.categories.push(action.payload);
        //     });
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
// const asyncDeleteCategory = createAsyncThunk(
//     `${sliceName}/deleteCategory`,
//     async (categoryID, { getState, rejectWithValue }) => {
//         const productsInState = getState().products.products;
//         const isUsed = !!productsInState.find(
//             (product) => product.category_code === categoryID
//         );

//         if (!isUsed) {
//             try {
//                 const data = await OrderItem.deleteCategory(categoryID);
//                 return categoryID;
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//         alert("Category being used");
//         return rejectWithValue(HTTP_STATUS.FORBIDDEN);
//     }
// );
// const asyncPostCategory = createAsyncThunk(
//     `${sliceName}/postCategory`,
//     async (categoryData, { getState, rejectWithValue }) => {
//         const categoriesInState = getState().categories.categories;

//         const categoryName = categoryData.name;
//         const categoryTax = categoryData.tax;

//         const isNameUsed = !!categoriesInState.find(
//             (category) => category.name === categoryName
//         );
//         const isTaxInRange =
//             !!Number(categoryTax) && 0 <= categoryTax && categoryTax <= 100;

//         if (!isNameUsed && isTaxInRange) {
//             try {
//                 const data = await OrderItem.postCategory(
//                     categoryName,
//                     categoryTax
//                 );
//                 return data;
//             } catch (error) {
//                 console.error(error);
//             }
//         }

//         alert("Something went wrong! Please reenter your inputs!");
//         return rejectWithValue(HTTP_STATUS.FORBIDDEN);
//     }
// );

export default orderItemSlice.reducer;
export const { addProductToCart } = orderItemSlice.actions;
export {
    // Selectors
    selectAllOrderItem,
    getOrderItemError,
    getOrderItemStatus,
    // Thunks
    asyncFetchOrderItems,
    // asyncDeleteCategory,
    // asyncPostCategory,
};
