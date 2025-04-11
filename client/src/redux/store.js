import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import themeReducer from "./slices/themeSlice";
import { persistReducer, persistStore } from "redux-persist";
import { paymentApi } from "./apis/paymentApi";
import { orderApi } from "./apis/orderApi";
import { couponApi } from "./apis/couponApi";
import { reviewApi } from "./apis/reviewApi";
import { bannerApi } from "./apis/bannerApi";
import { authApi } from "./apis/authApi";
import { productApi } from "./apis/productApi";
import { subscriptionApi } from "./apis/subscriptionApi";
import { blogApi } from "./apis/blogApi";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "cart", "wishlist", "theme"],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [couponApi.reducerPath]: couponApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [bannerApi.reducerPath]: bannerApi.reducer,
  [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  theme: themeReducer,
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
      paymentApi.middleware,
      orderApi.middleware,
      couponApi.middleware,
      reviewApi.middleware,
      bannerApi.middleware,
      subscriptionApi.middleware,
      blogApi.middleware,
    ),
  // devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store); 
export default store;