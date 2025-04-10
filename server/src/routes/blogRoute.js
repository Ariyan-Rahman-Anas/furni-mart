import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { isAdminOrSuperAdmin } from "../middlewares/isAdmin.js"
import { multerMiddleware } from "../utils/multer.js"
import { createBlog, getBlogs } from "../controllers/blogController.js"

const router = express.Router()

router.post("/create", isAuthenticated, isAdminOrSuperAdmin, multerMiddleware, createBlog)
router.get("/get", getBlogs)
export default router