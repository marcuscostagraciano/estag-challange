import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { THUNK_STATUS } from "../../utils/constants";

import Categories from "../../services/Categories";

const sliceName = "categories";
const initialState = {
    categories: [],
    error: null,
    status: THUNK_STATUS.IDLE,
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
        saveCategories (state, action) {
            state = action.payload;
        },
    },

    extraReducers (builder) {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = THUNK_STATUS.LOADING;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = THUNK_STATUS.SUCCEDDED;

                state.categories = state.categories.concat(action.payload);
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = THUNK_STATUS.FAILED;
                state.error = action.error.message;
            });
    },
});

export default categoriesSlice.reducer;
export const { postCategory, saveCategories } = categoriesSlice.actions;

// Selectors
const selectAllCategories = (state) => state.categories.categories;
const getCategoriesError = (state) => state.categories.error;
const getCategoriesStatus = (state) => state.categories.status;

export { selectAllCategories, getCategoriesError, getCategoriesStatus };

// AsyncThunks
const fetchCategories = createAsyncThunk(
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
export { fetchCategories };
