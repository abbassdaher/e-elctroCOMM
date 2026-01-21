import { createSlice } from "@reduxjs/toolkit";

const initialState = { product: [] };

const ClickedOnProductSlice = createSlice({
  name: "clickedOnProduct",
  initialState,
  reducers: {
    clickedOnProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { clickedOnProduct } = ClickedOnProductSlice.actions;
export default ClickedOnProductSlice.reducer;
