import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: null, // ✅ Store only one product for "Buy Now"
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setCheckoutProduct: (state, action) => {
            state.product = action.payload;
        },
        clearCheckoutProduct: (state) => {
            state.product = null;
        },
    },
});

export const { setCheckoutProduct, clearCheckoutProduct } = checkoutSlice.actions;

export default checkoutSlice.reducer;
