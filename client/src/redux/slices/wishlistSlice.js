import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [], // Array to store wishlist items
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload; // Assuming payload contains the product object or ID
      const exists = state.wishlistItems.find((item) => item.id === product.id);
      if (!exists) {
        state.wishlistItems.push(product);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload; // Assuming payload contains the product ID
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== productId
      );
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;