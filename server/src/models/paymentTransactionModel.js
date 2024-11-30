import mongoose from "mongoose";

const paymentTransactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    initiateData: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED"],
      default: "PENDING",
    },
  },
  { timestamps: true, versionKey:false }
);

const PaymentTransactionModel = mongoose.models.paymentTransaction || mongoose.model(
  "paymentTransaction",
  paymentTransactionSchema
);

export default PaymentTransactionModel;