import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountApi from "../../api/accountAPI";

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        listItems: [],
    },
    reducers: {
        setListItems: (state, action) => {
            state.listItems = action.payload
        },
        pushListItems: (state, action) => {
            state.listItems.push(action.payload)
        },
    },


})