import express from "express"
import { isAuthenticated } from './../middlewares/isAuthenticated.js';
import { isAdmin } from './../middlewares/isAdmin.js';
import { createBanner, deleteABanner, getAllBanner } from "../controllers/bannerController.js";
import { multerMiddleware } from "../utils/multer.js";

const router = express.Router()

router.post("/create",  isAuthenticated, isAdmin, multerMiddleware, createBanner)
router.get("/list", isAuthenticated, isAdmin, getAllBanner)
router.delete("/:id", isAuthenticated, isAdmin, deleteABanner);

export default router;