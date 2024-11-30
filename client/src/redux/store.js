import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import { authApi } from "./apis/authApi";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
import { productApi } from "./apis/productApi";
import { wishlistApi } from "./apis/wishlistApi";
import { paymentApi } from "./apis/paymnetApi";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "cart"],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  auth: authReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      productApi.middleware,
      wishlistApi.middleware,
      paymentApi.middleware),
  // devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store); 
export default store;