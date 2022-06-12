import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "./slices/accountSlices";
import { clothSlice } from "./slices/clothSlice";
import { staffSlice } from "./slices/staffSlices";
import { checkoutSlice } from "./slices/checkoutSlices"
import { favoriteSlice } from "./slices/favoriteSlice";
import { slidedataSlice } from "./slices/slidedataSlice";
import { homePageAssetSlice } from './slices/homepageAssetSlice';
import { categorySlice } from "./slices/categorySlice";

const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        clothes: clothSlice.reducer,
        staff: staffSlice.reducer,
        checkout: checkoutSlice.reducer,
        favorite: favoriteSlice.reducer,
        slidedata: slidedataSlice.reducer,
        homePageAsset: homePageAssetSlice.reducer,
        category: categorySlice.reducer
    },
})

export default store;