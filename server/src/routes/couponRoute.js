import express from "express"
import {
  activateCoupon,
  applyCoupon,
  createCoupon,
  deleteCoupon,
  expireCoupon,
  getAllCoupons,
  getSingleCoupon,
} from "../controllers/couponController.js";
import { isAuthenticated } from './../middlewares/isAuthenticated.js';
import { isAdmin } from './../middlewares/isAdmin.js';

const router = express.Router()

router.post("/create", isAuthenticated, isAdmin, createCoupon)
router.post("/active/:id", isAuthenticated, isAdmin, activateCoupon);
router.post("/expire/:id", isAuthenticated, isAdmin, expireCoupon);
router.post("/apply", applyCoupon)
router.get("/list", isAuthenticated, isAdmin, getAllCoupons);
router.get("/:id", isAuthenticated, isAdmin, getSingleCoupon);
router.delete("/:id", isAuthenticated, isAdmin, deleteCoupon);

export default router