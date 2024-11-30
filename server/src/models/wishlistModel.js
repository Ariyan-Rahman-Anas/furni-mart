import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: [true, "Product Id required"],
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
export const WishlistModel =
    mongoose.models.wishlist || mongoose.model("wishlist", wishlistSchema);
export default WishlistModel;