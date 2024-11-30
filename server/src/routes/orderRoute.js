import express from "express"
import { allOrders, anUserOrders } from "../controllers/orderController.js"
import { protectRoute } from './../middlewares/protectRoute.js';

const router = express.Router()

router.get("/list", allOrders)
router.get("/my-orders", anUserOrders);

export default router;