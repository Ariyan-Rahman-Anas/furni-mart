import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { isAdminOrSuperAdmin } from "../middlewares/isAdmin.js"
import { multerMiddleware } from "../utils/multer.js"
import { createBlog, deleteBlog, getBlogs, searchBlog, trackBlogView } from "../controllers/blogController.js"

const router = express.Router()

router.post("/create", isAuthenticated, isAdminOrSuperAdmin, multerMiddleware, createBlog)
router.get("/list", getBlogs)
router.get("/search", searchBlog)
router.patch("/:slug", trackBlogView)
router.delete("/:id", isAuthenticated, isAdminOrSuperAdmin, deleteBlog)

export default router