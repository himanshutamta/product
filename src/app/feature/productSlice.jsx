import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    productList : []
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.productList.push(action.payload)
        },
        deleteProduct: (state, action) => {
            console.log(action.payload, "eiuoisd")
          state.productList =   state.productList.filter((i) => i.id !== action.payload)

        }
        
    }
})

export const { addProduct , deleteProduct } = productSlice.actions;
export default productSlice.reducer;
  