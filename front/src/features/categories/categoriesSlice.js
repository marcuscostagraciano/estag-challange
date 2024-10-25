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
            .addCase(asyncPostCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(asyncDeleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(
                    (category) => category.code !== action.payload
                );
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
        const isUsed = productsInState.find(
            (product) => product.category_code == categoryID
        );

        if (!isUsed) {
            try {
                const data = await Categories.deleteCategory(categoryID);
                return categoryID;
            } catch (error) {
                console.error(error);
            }
        }

        alert("Category being used");
        return rejectWithValue(HTTP_STATUS.FORBIDDEN);
    }
);

const asyncPostCategory = createAsyncThunk(
    `${sliceName}/postCategory`,
    async (categoryData, { getState, rejectWithValue }) => {
        const categoriesInState = getState().categories.categories;
        const isNameUsed = categoriesInState.find(
            (category) => category.name == categoryData.name
        );

        if (!isNameUsed) {
            try {
                const data = await Categories.postCategory(
                    categoryData.name,
                    categoryData.tax
                );
                return data;
            } catch (error) {
                console.error(error);
            }
        }

        alert("Category name being used");
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
