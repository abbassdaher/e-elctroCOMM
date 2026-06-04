import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  removeProduct: null;
  editProduct: null;
  seeProduct: null;
}

const initialState: SettingsState = {
  removeProduct: null,
  editProduct: null,
  seeProduct: null,
};

export const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    removeProduct(state, action) {
      state.removeProduct = action.payload;
      console.log(state.removeProduct);
    },
    editProduct(state, action) {
      state.editProduct = action.payload;
      console.log(state);
    },
    seeProduct(state: SettingsState, action) {
      state.seeProduct = action.payload;
      console.log(state);
    },
  },
});

export const { removeProduct, editProduct, seeProduct } = SettingsSlice.actions;
