import { createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../interface";
// import RootState from your store file
import type { RootState } from "./Store";

interface cartState {
  cartItems: IProduct[];
}

// Define the initial state using that type
const initialState: cartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.cartItems = [
          { ...existingItem, quantity: existingItem.quantity + 1 },
          ...state.cartItems.filter((item) => item.id !== existingItem.id),
        ];
      } else {
        state.cartItems = [
          ...state.cartItems,
          { ...action.payload, quantity: 1 },
        ];
      }
      //         state.cartItems.push({ ...action.payload, quantity: 1 });
    },
  },
});

export const { addToCart } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const cartSelector = ({ cart }: RootState) => cart.cartItems

export default cartSlice.reducer;
