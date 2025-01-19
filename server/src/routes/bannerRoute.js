import express from "express"
import { isAuthenticated } from './../middlewares/isAuthenticated.js';
import { isAdmin, isSuperAdmin } from './../middlewares/isAdmin.js';
import { createBanner, deleteABanner, getAllBanner } from "../controllers/bannerController.js";
import { multerMiddleware } from "../utils/multer.js";

const router = express.Router()

router.post("/create",  isAuthenticated, isAdmin, multerMiddleware, createBanner)
router.get("/list", getAllBanner)
router.delete("/:id", isAuthenticated, isSuperAdmin, deleteABanner);

export default router;