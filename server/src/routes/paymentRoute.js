import express from "express"
import { createPaymentWithSSL, paymentCancel, paymentFailed, paymentSuccess } from "../controllers/paymentController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router()

router.post("/ssl", isAuthenticated, createPaymentWithSSL)
router.post("/success", paymentSuccess);
router.post("/failed", paymentFailed);
router.post("/cancel", paymentCancel);

export default router