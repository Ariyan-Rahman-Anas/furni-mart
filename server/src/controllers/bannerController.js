import BannerModel from "../models/bannerModel.js";
import { deleteImgFromCloudinary } from "../utils/deleteImgFromCloudinary.js";
import { uploadImagesToCloudinary } from "../utils/uploadImagesToCloudinary.js";
import ErrorHandler from './../utils/errorHandler.js';

export const createBanner = async (req, res, next) => {
    try {
        const images = req.files;
        const { title, description } = req.body;

        if (!images) {
            return next(
                new ErrorHandler("At least one image must be provided", 400)
            );
        }
        if (images.length > 10)
            return next(
                new ErrorHandler("Maximum 10 photos allowed", 400)
            );

        const imgUrl = await uploadImagesToCloudinary(images);
        if (!imgUrl || imgUrl.length === 0) {
            return next(new ErrorHandler("Failed to upload images", 500));
        }

        const banner = await BannerModel.create({
          title,
          description,
          images: imgUrl,
        });

        res.status(201).json({
            success: true,
            message: "Created",
            banner,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllBanner = async (req, res, next) => {
    try {
        const banners = await BannerModel.find({})
        if (banners.length < 1) {
            return next(new ErrorHandler("There's no banners right now"))
        }
        return res.status(200).json({
          success: true,
          message: "All banners retrieved",
          totalBanner: banners.length,
          banners,
        });
    } catch (error) {
        next(error)
    }
}

export const deleteABanner = async (req, res, next) => {
    try {
        const banner = await BannerModel.findById(req.params.id)
        if (!banner) {
            return next(new ErrorHandler("Banner not found", 404));
        }
        const bannerIds = banner.images.map((id) => id.public_id);
        await deleteImgFromCloudinary(bannerIds);
        await banner.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Deleted"
        })
    } catch (error) {
        next(error)
    }
}