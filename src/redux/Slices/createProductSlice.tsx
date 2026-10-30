import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreateProduct: null,
  CurrentFiles: [{}],
};

export const CreateProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    isCreateProduct(state, action) {
      state.isCreateProduct = action.payload;
      console.log("isCreateProduct" + state.isCreateProduct);
      // "Mutating" update syntax thanks to Immer, and no `return` needed
    },
    CurrentFiles(state, action) {
      state.CurrentFiles = action.payload;
      console.log(state.CurrentFiles)
    },
  },
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { isCreateProduct ,CurrentFiles} = CreateProductSlice.actions;

// Export the slice reducer as the default export
// export default CreateProductSlice.reducer;
