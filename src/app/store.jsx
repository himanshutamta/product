import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./feature/productSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "root",
    storage,
    blacklist : []
};

const persistedReducer = persistReducer(persistConfig, productSlice.reducer);
 
  
export const store = configureStore({
    reducer: {
        product: persistedReducer,   
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            ignoredPaths: ["register"], // Ignore paths containing non-serializable values
          },
        }),
})
export const persistor = persistStore(store);

