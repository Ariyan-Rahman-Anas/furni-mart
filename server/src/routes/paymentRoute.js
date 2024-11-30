import express from "express"
import { createPaymentWithSSL, paymentCancel, paymentFailed, paymentSuccess } from "../controllers/paymentController.js"

const router = express.Router()

router.post("/ssl", createPaymentWithSSL)
router.post("/success", paymentSuccess);
router.post("/failed", paymentFailed);
router.post("/cancel", paymentCancel);


export default router