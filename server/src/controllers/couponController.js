import CouponModel  from "../models/couponModel.js";
import ErrorHandler from "../utils/errorHandler.js";


// creating a coupon code
export const createCoupon = async (req, res, next) => {
  console.log("body999", req.body)

  try {
    const {
      code,
      discountType,
      discountValue,
      minOrderValue,
      expirationDays,
      expirationHours,
      expirationMinutes,
      usageLimit,
      usageCount,
      applicableSubcategories,
      applicableProducts,
      status,
    } = req.body;

    if (!code || !discountType || !discountValue || !expirationHours) {
      return next(new ErrorHandler("Please fullfil all required fill", 400));
    }

    const isCouponAlreadyExist = await CouponModel.findOne({ code });
    if (isCouponAlreadyExist)
      return next(new ErrorHandler("This coupon is already exist", 409));

    if (expirationHours > 24)
      return next(new ErrorHandler("Expiration hours must not exceed 24", 400));

    if (expirationMinutes > 60)
      return next(new ErrorHandler("Expiration minutes must not exceed 60", 400));

    const coupon = await CouponModel.create({
      code,
      discountType,
      discountValue,
      minOrderValue,
      expirationDays,
      expirationHours,
      expirationMinutes,
      usageLimit,
      usageCount,
      applicableSubcategories,
      applicableProducts,
      status,
    });

    res.status(200).json({
      success: true,
      message: "Coupon created Successfully",
      coupon,
    });
  } catch (error) {
    next(error)
  }
};

// apply for discount
export const applyCoupon = async (req, res, next) => {
  try {
    const { couponCode } = req.query;
    const discount = await CouponModel.findOne({ couponCode });
    if (!discount) return next(new ErrorHandler("Invalid coupon code", 400));
    res.status(200).json({
      success: true,
      message: "congrats! You've got the discount",
      data: discount,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to apply discount", 500));
  }
};


// a single coupon
export const getSingleCoupon = async (req, res, next) => {
  try {
    const coupon = await CouponModel.findById(req.params.id).populate(
      "applicableProducts"
    );
    if (!coupon) {
      return next(new ErrorHandler("coupon not found with this Id ", 404));
    }
    return res.status(200).json({
      success: true,
      message: "A coupon retrieved successfully",
      coupon
    })
  } catch (error) {
    next(error)
  }
}


// all coupons
export const getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await CouponModel.find({});
    if (coupons.length < 1)
      return next(new ErrorHandler("Oops! There's no coupon right now", 404));
    res.status(200).json({
      success: true,
      message: "All coupons retrieved successfully",
      totalCoupons: coupons.length,
      coupons,
    });
  } catch (error) {
    next(error)
  }
};

//delete coupon
export const deleteCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coupon = await CouponModel.findById(id);
    if (!coupon) return next(new ErrorHandler("Coupon not found", 404));

    await coupon.deleteOne();

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    next(error)
  }
};