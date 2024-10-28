import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    THUNK_STATUS,
    INITIAL_STATE,
    HTTP_STATUS,
} from "../../utils/constants";

import Categories from "../../services/Categories";

const sliceName = "categories";
const initialState = {
    categories: [],
    ...INITIAL_STATE,
};

const categoriesSlice = createSlice({
    name: sliceName,
    initialState,

    reducers: {
        postCategory: {
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
            .addCase(asyncFetchCategories.pending, (state) => {
                state.status = THUNK_STATUS.LOADING;
            })
            .addCase(asyncFetchCategories.fulfilled, (state, action) => {
                state.status = THUNK_STATUS.SUCCEDDED;
                state.categories = state.categories.concat(action.payload);
            })
            .addCase(asyncFetchCategories.rejected, (state, action) => {
                state.status = THUNK_STATUS.FAILED;
                state.error = action.error.message;
            })
            // Delete
            .addCase(asyncDeleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(
                    (category) => category.code !== action.payload
                );
            })
            .addCase(asyncDeleteCategory.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Post
            .addCase(asyncPostCategory.pending, (state, action) => {
                state.status = THUNK_STATUS.LOADING;
            })
            .addCase(asyncPostCategory.fulfilled, (state, action) => {
                state.status = THUNK_STATUS.SUCCEDDED;
                state.categories.push(action.payload);
            })
            .addCase(asyncPostCategory.rejected, (state, action) => {
                state.status = THUNK_STATUS.FAILED;
            });
    },
});

// Selectors
const selectAllCategories = (state) => state.categories.categories;
const getCategoriesError = (state) => state.categories.error;
const getCategoriesStatus = (state) => state.categories.status;

// AsyncThunks
const asyncFetchCategories = createAsyncThunk(
    `${sliceName}/fetchCategories`,
    async () => {
        try {
            const data = await Categories.getCategories();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
);
const asyncDeleteCategory = createAsyncThunk(
    `${sliceName}/deleteCategory`,
    async (categoryID, { getState, rejectWithValue }) => {
        const productsInState = getState().products.products;
        const isUsed = !!productsInState.find(
            (product) => product.category_code === categoryID
        );

        if (isUsed) {
            console.log("dentro do if (isUsed)");

            let data;
            try {
                data = await Categories.deleteCategory(categoryID);
                return categoryID;
            } catch (error) {
                console.error(error);
            }
            alert("Category being used");
            return rejectWithValue(data);
        }
    }
);
const asyncPostCategory = createAsyncThunk(
    `${sliceName}/postCategory`,
    async (categoryData, { getState, rejectWithValue }) => {
        const categoriesInState = getState().categories.categories;

        const categoryName = categoryData.name;
        const categoryTax = categoryData.tax;

        const isNameUsed = !!categoriesInState.find(
            (category) => category.name === categoryName
        );
        const isTaxInRange =
            !!Number(categoryTax) && 0 <= categoryTax && categoryTax <= 100;

        if (!isNameUsed && isTaxInRange) {
            try {
                const data = await Categories.postCategory(
                    categoryName,
                    categoryTax
                );
                return data;
            } catch (error) {
                console.error(error);
            }
        }

        alert("Something went wrong! Please reenter your inputs!");
        return rejectWithValue(HTTP_STATUS.FORBIDDEN);
    }
);

export default categoriesSlice.reducer;
export const { postCategory } = categoriesSlice.actions;
export {
    // Selectors
    selectAllCategories,
    getCategoriesError,
    getCategoriesStatus,
    // Thunks
    asyncFetchCategories,
    asyncDeleteCategory,
    asyncPostCategory,
};
