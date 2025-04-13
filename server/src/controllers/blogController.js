import BlogModel from "../models/blogModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { uploadImagesToCloudinary } from "../utils/uploadImagesToCloudinary.js";


// posting a blog
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


// getting all blogs
export const getBlogs = async (req, res, next) => {
    try {
        const blogs = await BlogModel.find({})
        if (blogs.length < 1) {
            return next(new ErrorHandler("There's no blogs right now", 404))
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


// search blog
export const searchBlog = async (req, res, next) => {
  try {
    const { search, popular } = req.query;
    const baseQuery = {};
    if (search) {
      baseQuery.title = {
        $regex: search,
        $options: "i",
      };
    }

    const sortByViews = popular === "true" ? { views: -1 } : { createdAt: -1 };

    const blogs = await BlogModel.find(baseQuery).sort(sortByViews);

    if (blogs.length < 1) {
      return next(new ErrorHandler("No blogs found!", 404));
    }

    res.status(200).json({
      success: true,
      message: "Blogs retrieved",
      totalBlogs: blogs.length,
      blogs,
    });
  } catch (error) {
    next(error);
  }
};


// delete a blog
export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await BlogModel.findById(req.params.id)
        if (!blog) {
            return next(new ErrorHandler("Blog not found", 404))
        }
        await blog.deleteOne()
        return res.status(200).json({
            success: true,
            message: "Deleted"
        })
    } catch (error) {
        next(error)
    }
}