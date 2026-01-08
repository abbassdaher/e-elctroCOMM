import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../components/axios/axiosInstace";
import type { IProductsState } from "../../interface";

// First, create the thunk
export const getProductsList = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axiosInstance.get("/products");
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const initialState: IProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // pending
    builder.addCase(getProductsList.pending, (state) => {
      state.loading = true;
    });
    // fulfilled
    builder.addCase(getProductsList.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    // rejected
    builder.addCase(getProductsList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export default productsSlice.reducer;
