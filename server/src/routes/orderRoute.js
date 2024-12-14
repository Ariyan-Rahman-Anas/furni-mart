import express from "express"
import { allOrders, anUserOrders, deleteAnOrder, deletePendingTransaction, getSingleOrder, getTransactionPendingOrders } from "../controllers/orderController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router()

router.get("/list", isAuthenticated, isAdmin, allOrders)
router.get("/my-orders", isAuthenticated, anUserOrders);
router.get("/pending", isAuthenticated, isAdmin, getTransactionPendingOrders);
router.get("/:id", isAuthenticated, getSingleOrder)
router.delete("/:id", isAuthenticated, isAdmin, deleteAnOrder);
router.delete(
  "/pending/:id",
  isAuthenticated,
  isAdmin,
  deletePendingTransaction
);

export default router;