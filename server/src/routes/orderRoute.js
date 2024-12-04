import express from "express"
import { allOrders, anUserOrders, getTransactionPendingOrders } from "../controllers/orderController.js"

const router = express.Router()

router.get("/list", allOrders)
router.get("/my-orders", anUserOrders);
router.get("/pending", getTransactionPendingOrders)

export default router;