import express from "express"
import { createCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from "../controllers/couponController.js"

const router = express.Router()

router.post("/create", createCoupon )
router.get("/list", getAllCoupons)
router.get("/:id", getSingleCoupon)
router.delete("/:id", deleteCoupon)
router.put("/:id", updateCoupon )

export default router