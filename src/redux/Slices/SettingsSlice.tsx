import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  removeProduct: null;
  editProduct: null;
  seeProduct: null;
  lastProductID?: number;
  isOffline?: boolean;
}

const initialState: SettingsState = {
  removeProduct: null,
  editProduct: null,
  seeProduct: null,
  lastProductID: undefined,
  isOffline: undefined,
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
    lastProductID(state, action) {
      state.lastProductID = action.payload;
      // console.log(state);
    },
    isOffline(state, action) {
      state.isOffline = action.payload;
      console.log(state.isOffline);
    }
  },
});

export const { removeProduct, editProduct, seeProduct, lastProductID, isOffline } = SettingsSlice.actions;
