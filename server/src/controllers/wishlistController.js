import ErrorHandler from '../utils/errorHandler.js';
import WishlistModel  from './../models/wishlistModel.js';

export const addToWishlist = async (req, res, next) => {
    try {
      const { user, products } = req.body;
      if (!user || !products) {
        return next(new ErrorHandler("User and Product ID are required", 400));
      }

      // Check if the product already exists in the user's wishlist
      const existingWishlist = await WishlistModel.findOne({ user: user });

      if (existingWishlist) {
        const productExists = existingWishlist.products.some(
          (item) => item.productId?.toString() === products
        );

        if (productExists) {
          return next(
            new ErrorHandler("This product is already in your wishlist", 409)
          );
        }
      }

      // Logic for adding product to the user's wishlist
      const wishlist = await WishlistModel.findOneAndUpdate(
        { user: user }, // user is the string reference to the user
        { $addToSet: { products: { productId: products } } }, // Wrap productId in an object
        { upsert: true, new: true }
      );

      res.status(200).json({
        success: true,
        message: "Product added to your wishlist",
        wishlist,
      });
    } catch (error) {
        next(error)
    }
}


export const anUserWishlist = async ( req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      if (!id) return next(new ErrorHandler("User ID is required", 400));
    }

    const wishlist = await WishlistModel.findOne({ user: id })
      .populate({
        path: "products.productId",
        model: "products",
      })
      .exec();

    if (!wishlist) {
      return next(new ErrorHandler("Wishlist not found", 400));
    }

    return res.status(200).json({
      success: true,
      message: "This user's wishlist retrieved successfully",
      totalItems: wishlist?.products?.length,
      wishlist,
    });
  } catch (error) {
      next(error)
    // console.error("Error retrieving wishlist:", error);
    // return next(new ErrorHandler("Failed to retrieve wishlist", 500));
  }
};


// export const removeFromWishlist = async ( req, res , next) => {
//   const { userId, productId } = req.body;
//   console.log(userId, productId);
//   try {
//     if (!userId || !productId) {
//       return next(new ErrorHandler("User ID and Product ID are required", 400));
//     }

//     // Find the user's wishlist and remove the product
//     const updatedWishlist = await WishlistModel.findOneAndUpdate(
//       { user: userId }, // Match the user's wishlist
//       { $pull: { products: { productId: productId } } }, // Remove the specific product
//       { new: true } // Return the updated wishlist
//     );


//     if (!updatedWishlist) {
//       return next(new ErrorHandler("Wishlist not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product removed from your wishlist",
//       updatedWishlist,
//     });
//   } catch (error) {
//    next(error)
//   }
// };



// import WishlistModel from './wishlistModel'; // Adjust the import path as needed

export const removeFromWishlist = async (req, res, next) => {
  const { userId, productId } = req.body;
  console.log("productId", productId);

  try {
    if (!userId || !productId) {
      return next(new ErrorHandler("User ID and Product ID are required", 400));
    }

    // Find the user's wishlist
    const wishlist = await WishlistModel.findOne({ user: userId });

    if (!wishlist) {
      return next(new ErrorHandler("Wishlist not found", 404));
    }

    // Use .map() to filter out the product
    const updatedProducts = wishlist.products.filter(
      (product) => product.productId.toString() !== productId
    );

    // If the products array is unchanged, return a message
    if (updatedProducts.length === wishlist.products.length) {
      return next(new ErrorHandler("Product not found in wishlist", 404));
    }

    // Update the user's wishlist with the new product array
    wishlist.products = updatedProducts;
    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Product removed from your wishlist",
      updatedWishlist: wishlist,
    });
  } catch (error) {
    next(error);
  }
};