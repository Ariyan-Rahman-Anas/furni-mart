import express from "express"
import { allOrders, anUserOrders, getSingleOrder, getTransactionPendingOrders } from "../controllers/orderController.js"

const router = express.Router()

router.get("/list", allOrders)
router.get("/my-orders", anUserOrders);
router.get("/pending", getTransactionPendingOrders)
router.get("/:id", getSingleOrder)

export default router;