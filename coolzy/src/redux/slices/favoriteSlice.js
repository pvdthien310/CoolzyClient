import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import favoriteAPI from "../../api/favoriteAPI";

export const getAllFav = createAsyncThunk(
    'favorite/getAll',
    async (data, { rejectWithValue }) => {
        const response = await favoriteAPI.getAll()
        if (!response) {
            return rejectWithValue("Get All Failed");
        }
        else {
            return response;
        }
    }
);

export const addFav = createAsyncThunk(
    "favorite/addFav",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await favoriteAPI.addFav(data);
            if (!response) {
                return rejectWithValue();
            } else {
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    })

export const deleteFavoriteById = createAsyncThunk(
    "favorite/deleteFavoriteById",
    async (data, { rejectWithValue }) => {
        try {
            const response = await favoriteAPI.delete(data);
            if (!response) {
                return rejectWithValue();
            } else {
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    })


export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        favoriteList: [],
        loading: false
    },
    reducers: {
        favoriteListChange: (state, action) => {
            state.favoriteList = action.payload;
        },
        favoriteLoadingChange: (state, action) => {
            state.loading = action.payload;
        },
        addFav: (state, action) => {
            state.favoriteList.push(action.payload)
        },
    },
    extraReducers: {
        [addFav.pending]: (state) => {
            state.loading = true;
        },
        [addFav.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [addFav.rejected]: (state, action) => {
            state.loading = false;
        },
        [deleteFavoriteById.pending]: (state) => {
            state.loading = true;
            console.log("Start slice...")
        },
        [deleteFavoriteById.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("Fulfilled")
        },
        [deleteFavoriteById.rejected]: (state, action) => {
            state.loading = false;
            console.log("Rejected..")
        },
        [getAllFav.pending]: (state) => {
            state.loading = true;
        },
        [getAllFav.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [getAllFav.rejected]: (state, action) => {
            state.loading = false;
        },
    }
})