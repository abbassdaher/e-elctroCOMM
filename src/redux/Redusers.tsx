import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CounterState {
  value: number;
  isClick: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  isClick: false,
};

export const addToCartSlice = createSlice({
  name: "addToCartReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    addToCart: (state, action) => {
      console.log(action.payload);
      
    },
  },
});

export const { increment, decrement, addToCart } = addToCartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.addToCart.value

export default addToCartSlice.reducer;
