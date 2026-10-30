import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Redusers"; // export const store = configureStore({
import { ProductsList } from "./RTKQuery/ProductsList";
import ClickedOnProductSlice from "./Slices/ClickedOnProductSlice";
import { signUpInSlice } from "./Slices/Auth";

// Import SettingsSlice if it exists
import { SettingsSlice } from "./Slices/SettingsSlice";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/es/storage";
import { CreateProductSlice } from "./Slices/createProductSlice";

const persistCartConfig = {
  key: "cart",
  storage,
};
const persistedCard = persistReducer(persistCartConfig, cartReducer);
export const store = configureStore({
  reducer: {
    cart: persistedCard,
    // products:productsSlice,
    [ProductsList.reducerPath]: ProductsList.reducer,
    clickedOnProduct: ClickedOnProductSlice,
    [signUpInSlice.reducerPath]: signUpInSlice.reducer,
    [SettingsSlice.reducerPath]: SettingsSlice.reducer,
    [CreateProductSlice.reducerPath]: CreateProductSlice.reducer, // Add this line to include the CreateProductSlice reducer
     // Disabled: SettingsSlice not found
  },
  middleware: (getDefaultMiddleware) =>
    
    getDefaultMiddleware({
      serializableCheck: {
        // 👈 تجاهل أكشنات الـ persist لمنع ظهور التحذير في الـ Console
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      ProductsList.middleware,
      signUpInSlice.middleware,
      
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);
