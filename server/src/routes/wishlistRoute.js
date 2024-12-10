import express from "express"
import { addToWishlist, anUserWishlist, removeFromWishlist } from "../controllers/wishlistController.js"

const router = express.Router()

router.post("/add", addToWishlist)
router.get("/:id", anUserWishlist)
router.delete("/delete", removeFromWishlist)
export default router