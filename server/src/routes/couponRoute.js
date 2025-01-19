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
import { isAdminOrSuperAdmin, isSuperAdmin } from './../middlewares/isAdmin.js';

const router = express.Router()

router.post("/create", isAuthenticated, isAdminOrSuperAdmin, createCoupon)
router.post("/active/:id", isAuthenticated, isSuperAdmin, activateCoupon);
router.post("/expire/:id", isAuthenticated, isSuperAdmin, expireCoupon);
router.post("/apply", isAuthenticated, applyCoupon)
router.get("/list", getAllCoupons);
router.get("/:id", isAuthenticated, isAdminOrSuperAdmin, getSingleCoupon);
router.delete("/:id", isAuthenticated, isSuperAdmin, deleteCoupon);

export default router