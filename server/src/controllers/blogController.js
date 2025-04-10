import BlogModel from "../models/blogModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { uploadImagesToCloudinary } from "../utils/uploadImagesToCloudinary.js";

export const createBlog = async (req, res, next) => {
    try {
        const images = req.files
        const { title, slug, content, categories, tags, author, published, publishedAt, readingTime, views } = req.body
        if (!images) {
            return next(
                new ErrorHandler("At least one image must be provided", 400)
            );
        }
        if (images.length > 1)
            return next(
                new ErrorHandler("Maximum 1 photos allowed", 400)
            );
        const imgUrl = await uploadImagesToCloudinary(images);
        if (!imgUrl || imgUrl.length === 0) {
            return next(new ErrorHandler("Failed to upload images", 500));
        }

        const blog = await BlogModel.create({
            title,
            slug,
            content,
            categories,
            tags,
            author,
            published,
            publishedAt,
            readingTime,
            views,
            images: imgUrl,
        })
        res.status(201).json({
            success: true,
            message: "Created",
            blog,
        });
    } catch (error) {
        next(error)
    }
}


export const getBlogs = async (req, res, next) => {
    try {
        const blogs = await BlogModel.find({})
        if (blogs.length < 1) {
            return next(new ErrorHandler("There's no blogs right now"))
        }
        return res.status(200).json({
            success: true,
            message: "All blogs retrieved",
            totalBlogs: blogs.length,
            blogs,
        });
    } catch (error) {
        next(error)
    }
}