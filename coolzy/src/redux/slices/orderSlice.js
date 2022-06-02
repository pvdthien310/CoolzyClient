import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderAPI from '../../api/orderAPI'

export const getAllOrder = createAsyncThunk(
    'order/getAll',
    async(data, { rejectWithValue }) => {
        const response = await orderAPI.getAll()
        if (!response) {
            return rejectWithValue("Get All Failed");
        } else {
            return response;
        }
    }
);

export const updateOrder = createAsyncThunk(
    'order/updateOrder',
    async(data, { rejectedWithValue }) => {
        const response = await orderAPI.updateOrder(data)
        if (!response) {
            return rejectedWithValue(false)
        } else {
            return response
        }
    }
);

export const addOrder = createAsyncThunk(
    "order/addOrder",
    async(data, { rejectWithValue }) => {
        try {
            const response = await orderAPI.addOrder(data);
            if (!response) {
                return rejectWithValue();
            } else {
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    })


export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderList: [],
        isFromCart: false,
        loading: false
    },
    reducers: {
        orderListChange: (state, action) => {
            state.orderList = action.payload;
        },
        orderLoadingChange: (state, action) => {
            state.loading = action.payload;
        },
        addOrder: (state, action) => {
            state.orderList.push(action.payload)
        },
        setIsFromCart: (state, action) => {
            state.isFromCart = action.payload
        }
    },
    extraReducers: {
        [updateOrder.pending]: (state) => {
            state.loading = true;
        },
        [updateOrder.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [updateOrder.rejected]: (state, action) => {
            state.loading = false;
        },
        [addOrder.pending]: (state) => {
            state.loading = true;
        },
        [addOrder.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [addOrder.rejected]: (state, action) => {
            state.loading = false;
        }
    }
})