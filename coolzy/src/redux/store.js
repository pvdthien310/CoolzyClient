import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./slices/accountSlices";
import { clothSlice } from "./slices/clothSlice";

const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        clothes: clothSlice.reducer
    },
})

export default store;