import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./feature/productSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, productSlice.reducer);
 
  
export const store = configureStore({
    reducer: {
        product : persistedReducer
    }
})
export const persistor = persistStore(store);

