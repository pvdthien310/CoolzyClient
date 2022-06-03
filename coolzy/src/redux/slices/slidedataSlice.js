import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import slidedataAPI from './../../api/slidedataAPI';

export const getAllSlidedata = createAsyncThunk(
    'slidedata/getAll',
    async (data, { rejectWithValue }) => {
        const response = await slidedataAPI.getAll()
        if (!response) {
            return rejectWithValue("Get All Failed");
        }
        else {
            return response;
        }
    }
);

export const addSlidedata = createAsyncThunk(
    "slidedata/addSlidedata",
    async (data, { rejectWithValue }) => {
        try {
            const response = await slidedataAPI.addSlidedata(data);
            if (!response) {
                return rejectWithValue();
            } else {
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    })

export const slidedataSlice = createSlice({
    name: 'slidedata',
    initialState: {
        slidedataList: [],
        loading: false
    },
    reducer: {

    },
    extraReducers: {
        [addSlidedata.pending]: (state) => {
            state.loading = true;
            console.log("pending...");
        },
        [addSlidedata.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("fulfilled...");
        },
        [addSlidedata.rejected]: (state, action) => {
            state.loading = false;
            console.log("rejected...");
        },
        [getAllSlidedata.pending]: (state) => {
            state.loading = true;
        },
        [getAllSlidedata.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [getAllSlidedata.rejected]: (state, action) => {
            state.loading = false;
        },
    }
})