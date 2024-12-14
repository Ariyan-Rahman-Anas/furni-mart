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
    },
    expirationMinutes: {
      type: Number,
      default: 0,
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
    },
    expirationDate: {
      type: Date, // Store the exact expiration date when the coupon is activated
    },
  },
  { timestamps: true, versionKey: false }
);


// // Method to calculate and set the expiration date when the coupon is activated
// couponSchema.methods.activateCoupon = function () {
//   const now = new Date();
//   const expirationDate = new Date(now);

//   // Add expiration days, hours, and minutes to the current date
//   expirationDate.setDate(expirationDate.getDate() + this.expirationDays);
//   expirationDate.setHours(expirationDate.getHours() + this.expirationHours);
//   expirationDate.setMinutes(expirationDate.getMinutes() + this.expirationMinutes);

//   this.expirationDate = expirationDate;
//   this.status = "active"; // Set to active
//   return this.save(); // Save the updated coupon
// };

// // Method to check and auto-expire the coupon
// couponSchema.methods.checkAndExpire = async function () {
//   const now = new Date();
//   if (this.status === "active" && this.expirationDate <= now) {
//     this.status = "expired"; // Automatically expire the coupon
//     await this.save(); // Save the updated coupon
//   }
// };



// Method to calculate and set the expiration date when the coupon is activated
couponSchema.methods.activateCoupon = async function () {
  const now = new Date();
  const expirationDate = new Date(now);

  // Add expiration days, hours, and minutes to the current date
  expirationDate.setDate(expirationDate.getDate() + this.expirationDays);
  expirationDate.setHours(expirationDate.getHours() + this.expirationHours);
  expirationDate.setMinutes(
    expirationDate.getMinutes() + this.expirationMinutes
  );

  // Check if there is an already active coupon and deactivate it
  const existingActiveCoupon = await this.constructor.findOne({
    status: "active",
  }); // Use this.constructor to access the model
  if (
    existingActiveCoupon &&
    existingActiveCoupon._id.toString() !== this._id.toString()
  ) {
    existingActiveCoupon.status = "expired";
    await existingActiveCoupon.save(); // Save the updated status
  }

  // Activate the current coupon
  this.expirationDate = expirationDate;
  this.status = "active";
  return this.save(); // Save the updated coupon
}


const CouponModel =
  mongoose.models.coupons || mongoose.model("coupons", couponSchema);
export default CouponModel;