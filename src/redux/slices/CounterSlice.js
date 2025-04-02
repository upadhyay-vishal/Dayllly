import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            else {
                state.cart = state.cart.filter(item => item.id !== action.payload.id);
            }
        }
    }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = counterSlice.actions;

export default counterSlice.reducer;
