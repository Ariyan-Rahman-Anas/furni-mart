import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Please enter a coupon code"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "flat"],
      required: [true, "Please specify the discount type"],
    },
    discountValue: {
      type: Number,
      required: [true, "Please provide the discount value"],
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Discount value must be greater than 0",
      },
    },
    minOrderValue: {
      type: Number,
      default: 0, // Minimum order amount to apply the coupon
    },
    expirationDays: {
      type: Number,
      default: 0,
    },
    expirationHours: {
      type: Number,
      required: [true, "Please provide an expiration hours"],
      validate: {
        validator: function (value) {
          return value < 25;
        },
        message: "expiration hours value must be smaller than 25",
      },
    },
    expirationMinutes: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value < 61;
        },
        message: "expiration minutes value must be greater than 61",
      },
    },
    usageLimit: {
      type: Number,
      default: null, // Limit on how many times the coupon can be used (globally)
    },
    usageCount: {
      type: Number,
      default: 0, // Tracks how many times the coupon has been used
    },
    applicableSubcategories: [
      {
        type: String, // Categories the coupon applies to
      },
    ],
    applicableProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products", // Products the coupon applies to
      },
    ],
    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
  },
  { timestamps: true, versionKey: false }
);

const CouponModel =
  mongoose.models.coupons || mongoose.model("coupons", couponSchema);
export default CouponModel;