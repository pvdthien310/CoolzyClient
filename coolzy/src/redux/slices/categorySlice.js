import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        listCategory: [],
    },
    reducers: {
        productListChange: (state, action) => {
            state.listCategory = action.payload;
        },
        addCategory: (state, action) => {
            state.listCategory.push(action.payload)
        },
        deleteCategory: (state, action) => {
            state.listCategory = state.listCategory.filter(e => e._id != action.payload)
        }
    },

})