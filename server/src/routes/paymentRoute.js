import express from "express"
import { createPaymentWithSSL, paymentCancel, paymentFailed, paymentSuccess } from "../controllers/paymentController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router()

router.post("/ssl", isAuthenticated, createPaymentWithSSL)
router.post("/success", isAuthenticated, paymentSuccess);
router.post("/failed", isAuthenticated, paymentFailed);
router.post("/cancel", isAuthenticated, paymentCancel);

export default router