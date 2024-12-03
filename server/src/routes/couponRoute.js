import express from "express"
import { createCoupon, deleteCoupon, getAllCoupons, getSingleCoupon } from "../controllers/couponController.js"

const router = express.Router()

router.post("/create", createCoupon )
router.get("/list", getAllCoupons)
router.get("/:id", getSingleCoupon)
router.delete("/:id", deleteCoupon)

export default router