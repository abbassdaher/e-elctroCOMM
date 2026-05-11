import { configureStore } from "@reduxjs/toolkit";
import cartReducer  from "./Redusers"; // export const store = configureStore({
import { ProductsList } from "./RTKQuery/ProductsList";
import ClickedOnProductSlice from "./Slices/ClickedOnProductSlice";
import { signUpInSlice } from "./Slices/Auth";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const persistCartConfig = {
  key: "cart",
  storage,
};
const persistedCard = persistReducer(persistCartConfig, cartReducer );
export const store = configureStore({
  reducer: {
    cart: persistedCard,
    // products:productsSlice,
    [ProductsList.reducerPath]: ProductsList.reducer,
    clickedOnProduct: ClickedOnProductSlice,
    [signUpInSlice.reducerPath]: signUpInSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ProductsList.middleware,
      signUpInSlice.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);
