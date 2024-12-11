import ReviewModel from "../models/reviewModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import ProductModel from './../models/productModel.js';

export const postReview = async (req, res, next) => {
  try {
    const { product, user, rating, comment } = req.body;

    // Validate input
    if (!product || !user || !rating || rating < 1 || rating > 5 || !comment) {
      return next(
        new ErrorHandler("Please fulfill all fields with valid data", 400)
      );
    }

    // Check if the product exists
    const existingProduct = await ProductModel.findById(product);
    if (!existingProduct) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Check if the user has already reviewed this product
    const existingReview = await ReviewModel.findOne({ product, user });
    if (existingReview) {
      return next(
        new ErrorHandler("You have already reviewed this product", 400)
      );
    }

    // Create a new review
    const newReview = await ReviewModel.create({
      product,
      user,
      rating,
      comment,
    });

    // Update the product's averageRating and reviewCount
    const reviews = await ReviewModel.find({ product });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length ? totalRating / reviews.length : 0;

    await ProductModel.findByIdAndUpdate(product, {
      averageRating,
      reviewCount: reviews.length,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      newReview,
    });
  } catch (error) {
    next(error);
  }
};


export const reviewsList = async (req, res, next) => {
    try {
        const reviews = await ReviewModel.find({})
          .populate("user")
          .populate("product");
        if (reviews.length < 1) {
          return next(new ErrorHandler("There's no reviews right now", 404));
        }
        return res.status(200).json({
          success: true,
          message: "All reviews retrieved successfully",
          totalReviews: reviews.length,
          reviews,
        });
    } catch (error) {
        next(error);
    }
}


export const aProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;

    // Validate productId
    if (!productId) {
      return next(new ErrorHandler("Product ID is required", 400));
    }

    // Fetch reviews for the specific product
    const reviews = await ReviewModel.find({ product: productId })
      .populate("user") // Optional: Populate user details
      .sort({ createdAt: -1 }); // Sort by most recent reviews

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for this product",
      });
    }

    res.status(200).json({
      success: true,
      message: "A Product's review retrieved successfully",
      reviews,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteReview = async (req, res, next) => {
    try {
        console.log("req.user.id", req.user);
        
    // Find the review by ID
    const review = await ReviewModel.findById(req.params.id);

    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    // Find the associated product
    const product = await ProductModel.findById(review.product);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
      }
            
      if (review.user.toString() !== req.user._id && req.user.isAdmin !== true) {
        return next(
          new ErrorHandler("Not authorized to delete this review", 403)
        );
      }

    // Delete the review
    await review.deleteOne();

    // Update the product's averageRating and reviewCount
    const reviews = await ReviewModel.find({ product: review.product });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length ? totalRating / reviews.length : 0;

    product.averageRating = averageRating;
    product.reviewCount = reviews.length;
    await product.save();

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};