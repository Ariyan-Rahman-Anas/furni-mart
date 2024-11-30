import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   required: [true, "We need your userId to make an order"],
    // },
    user: {
      type: String,
      ref: "user",
      required: [true, "We need your userId or email to make an order"],
    },
    paymentInfo: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed"],
      default: "Pending",
    },
  },
  { timestamps: true, versionKey: false }
);

export const OrderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);