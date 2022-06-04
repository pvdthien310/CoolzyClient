import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import homePageAssetApi from './../../api/homePageAssetAPI';

export const getHomePageAsset = createAsyncThunk(
    'homepageasset/getAll',
    // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
    async (data, { rejectWithValue }) => {
        const response = await homePageAssetApi.getAll()
        if (!response) {
            return rejectWithValue("Get All Failed");
        }
        else {
            return response;
        }
    }
);

export const updateHomePageAsset = createAsyncThunk(
    'homepageasset/update',
    async (data, { rejectedWithValue }) => {
        const response = await homePageAssetApi.update(data)
        if (!response) {
            return rejectedWithValue(" Find home page asset failed")
        } else {
            return response.data
        }
    }
)

export const homePageAssetSlice = createSlice({
    name: 'homePageAsset',
    initialState: {
        // productList: [],
        loading: false
    },
    extraReducers: {
        [getHomePageAsset.pending]: (state) => {
            state.loading = true;
            console.log("Start slice");
        },
        [getHomePageAsset.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("Successfully");
        },
        [getHomePageAsset.rejected]: (state, action) => {
            state.loading = false;
        },
        [updateHomePageAsset.pending]: (state) => {
            state.loading = true;
            console.log("Start slice");
        },
        [updateHomePageAsset.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("Successfully");
        },
        [updateHomePageAsset.rejected]: (state, action) => {
            state.loading = false;
        }
    }
})