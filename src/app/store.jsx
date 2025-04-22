import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./feature/productSlice";


export const store = configureStore({
    reducer: {
        product : productSlice.reducer
    }
})