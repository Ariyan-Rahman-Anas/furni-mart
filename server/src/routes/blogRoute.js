import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { isAdminOrSuperAdmin } from "../middlewares/isAdmin.js"
import { multerMiddleware } from "../utils/multer.js"
import { createBlog, deleteBlog, getBlogs } from "../controllers/blogController.js"

const router = express.Router()

router.post("/create", isAuthenticated, isAdminOrSuperAdmin, multerMiddleware, createBlog)
router.get("/list", getBlogs)
router.delete("/:id", deleteBlog )

export default router