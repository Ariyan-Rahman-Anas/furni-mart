import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    billingInfo: {
      user: {
        type: String,
        ref: "user",
        required: [true, "We need your userId to make an order"],
      },
      anyMessage: {
        type: String,
      },
    },
    shippingInfo: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
  },
  { timestamps: true, versionKey: false }
);

export const OrderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);