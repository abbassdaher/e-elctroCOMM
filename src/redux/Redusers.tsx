import { createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../interface";

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
//     increment: (state) => {
            //     decrement: (state) => {
                        //       state.value += 1;
            //       state.value -= 1;
            //     },
            //     },
    addToCart: (state, action) => {
      console.log(action.payload);
      state.cartItems.push( action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.addToCart.value

export default cartSlice.reducer;
