import ProductModel from '../models/productModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import { uploadImagesToCloudinary } from './../utils/uploadImagesToCloudinary.js';
import { deleteImgFromCloudinary } from './../utils/deleteImgFromCloudinary.js';

export const create = async (req, res, next) => {
    try {
      const images = req.files;
      const body = req.body;
      console.log("images", images);
      console.log("body", body);
      const {
        name,
        category,
        subCategory,
        description,
        color,
        isFeatured,
        variants,
        brand,
      } = req.body;

      // Parse variants if it's a string
      const parsedVariants =
        typeof variants === "string" ? JSON.parse(variants) : variants;

      if (!images)
        return next(new ErrorHandler("Please attach an image!", 400));
      if (images.length < 1)
        return next(new ErrorHandler("Please add at least 1 photo", 400));
      if (images.length > 10)
        return next(
          new ErrorHandler("Maximum 10 photos allowed for a product", 400)
        );

      const imgUrl = await uploadImagesToCloudinary(images);

      if (!imgUrl || imgUrl.length === 0) {
        return next(new ErrorHandler("Failed to upload images", 500));
      }

      // Create the product in the database
      const product = await ProductModel.create({
        name,
        category,
        subCategory,
        brand,
        description,
        variants: parsedVariants,
        color,
        isFeatured,
        images: imgUrl,
      });

      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    } catch (error) {
        next(error)
    }
}

export const allCategory = async (req, res, next) => {
    try {
        const categories = await ProductModel.distinct("category");
        return res.status(200).json({
            success: true,
            message: "All category retrieved successfully",
            categories
        })
    } catch (error) {
        next(error)
    }
}


export const allSubCategory = async (req, res, next) => {
    try {
        const subCategories = await ProductModel.distinct("subCategory");
        return res.status(200).json({
          success: true,
          message: "All subCategories retrieved successfully",
          subCategories,
        });
    } catch (error) {
        next(error)
    }
}


export const productList = async (req, res, next) => {
    try {
        const products = await ProductModel.find({})
        if (products.length < 1) {
            return next(new ErrorHandler("There is no products yet",404))
        }
        return res.status(200).json({
            success: true,
            message: "All products retrieved successfully",
            totalProducts: products.length,
            products
        })
    } catch (error) {
        next(error)
    }
}


export const product = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found",404))
        }
        return res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            product
        })
    } catch (error) {
        next(error)
    }
}


export const searchProduct = async (req, res, next) => {
    try {
         console.log("Inside searchProducts route", req.query);
         const { search, subCategory, price, category, sort } = req.query;
         const page = Number(req.query.page) || 1;
         const limit = Number(process.env.PRODUCT_PER_PAGE) || 9;
         const skip = (page - 1) * limit;

         const baseQuery = {};

         // Search by product name
         if (search) {
           baseQuery.name = {
             $regex: search,
             $options: "i",
           };
         }
        

        if (price && !isNaN(Number(price))) {
          baseQuery.variants = {
            $elemMatch: { price: { $gte: Number(price) } }, // Search in variants array for price
          };
        }


         // Search by category
         if (category) baseQuery.category = category;
         if (subCategory) baseQuery.subCategory = subCategory;

         // Find products with pagination and sorting
         const productsPromise = ProductModel.find(baseQuery)
           .sort(
             sort === "asc"
               ? { "variants.price": 1 }
               : sort === "dsc"
               ? { "variants.price": -1 }
               : {}
           )
           .limit(limit)
           .skip(skip);

         // Get all filtered products for total count
         const [products, filteredProducts] = await Promise.all([
           productsPromise,
           ProductModel.find(baseQuery),
         ]);

         const totalPage = Math.ceil(filteredProducts.length / limit);

         if (products.length < 1) {
           return next(
             new ErrorHandler(`No products found with the given filters`, 404)
           );
         }

         res.status(200).json({
           success: true,
           message: "Products retrieved successfully by searching...",
           totalPage,
           totalItems: filteredProducts.length,
           products,
         });
    } catch (error) {
        next(error)
    }
}


export const deleteProduct= async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        const productImgIds = product.images?.map(id => id.public_id)
        await deleteImgFromCloudinary(productImgIds)

        await product.deleteOne()

        res.status(200).json({
          success: true,
          message: "Product deleted successfully",
        });
    } catch (error) {
        next(error)
    }
}