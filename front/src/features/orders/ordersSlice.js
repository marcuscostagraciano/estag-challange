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
        // builder
        //     // Fetch
        //     .addCase(asyncFetchCategories.pending, (state) => {
        //         state.status = THUNK_STATUS.LOADING;
        //     })
        //     .addCase(asyncFetchCategories.rejected, (state, action) => {
        //         state.status = THUNK_STATUS.IDLE;
        //         state.error = action.error.message;
        //     })
        //     .addCase(asyncFetchCategories.fulfilled, (state, action) => {
        //         state.status = THUNK_STATUS.SUCCEDDED;
        //         state.categories = state.categories.concat(action.payload);
        //     })
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
const selectAllCategories = (state) => state.categories.categories;
const getCategoriesError = (state) => state.categories.error;
const getCategoriesStatus = (state) => state.categories.status;

// AsyncThunks
// const asyncFetchCategories = createAsyncThunk(
//     `${sliceName}/fetchCategories`,
//     async () => {
//         try {
//             const data = await Categories.getCategories();
//             return data;
//         } catch (error) {
//             console.error(error);
//         }
//     }
// );
// const asyncDeleteCategory = createAsyncThunk(
//     `${sliceName}/deleteCategory`,
//     async (categoryID, { getState, rejectWithValue }) => {
//         const productsInState = getState().products.products;
//         const isUsed = !!productsInState.find(
//             (product) => product.category_code === categoryID
//         );

//         if (!isUsed) {
//             try {
//                 const data = await Categories.deleteCategory(categoryID);
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
//                 const data = await Categories.postCategory(
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

export default ordersSlice.reducer;
export const { addProductToCart } = ordersSlice.actions;
export {
    // Selectors
    selectAllCategories,
    getCategoriesError,
    getCategoriesStatus,
    // Thunks
    // asyncFetchCategories,
    // asyncDeleteCategory,
    // asyncPostCategory,
};
