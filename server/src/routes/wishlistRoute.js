import express from "express"
import { addToWishlist, anUserWishlist, removeFromWishlist } from "../controllers/wishlistController.js"
import { protectRoute } from './../middlewares/protectRoute.js';

const router = express.Router()

router.post("/add", protectRoute, addToWishlist)
router.get("/:id", anUserWishlist)
router.delete("/delete", removeFromWishlist)
export default router