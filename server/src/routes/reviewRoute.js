import express from "express"
import { aProductReviews, deleteReview, postReview, reviewsList } from "../controllers/reviewController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from './../middlewares/isAdmin.js';

const router = express.Router()

router.post("/create", isAuthenticated, postReview)
router.get("/list", isAuthenticated, isAdmin, reviewsList)
router.get("/:productId", aProductReviews);
router.delete("/:id", isAuthenticated,  deleteReview);

export default router;