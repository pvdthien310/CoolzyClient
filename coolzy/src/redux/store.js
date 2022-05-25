import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./slices/accountSlices";
import { clothSlice } from "./slices/clothSlice";
import { staffSlice } from "./slices/staffSlices";
import { checkoutSlice } from "./slices/checkoutSlices"

const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        clothes: clothSlice.reducer,
        staff: staffSlice.reducer,
        checkout: checkoutSlice.reducer
    },
})

export default store;