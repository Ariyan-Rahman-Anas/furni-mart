import express from "express"
import { allOrders, anUserOrders, deleteAnOrder, deletePendingTransaction, getSingleOrder, getTransactionPendingOrders } from "../controllers/orderController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin, isAdminOrSuperAdmin, isSuperAdmin } from "../middlewares/isAdmin.js";

const router = express.Router()

router.get("/list", isAuthenticated, isAdminOrSuperAdmin, allOrders)
router.get("/my-orders", isAuthenticated, anUserOrders);
router.get("/pending", isAuthenticated, isAdminOrSuperAdmin, getTransactionPendingOrders);
router.get("/:id", isAuthenticated, getSingleOrder)
router.delete("/:id", isAuthenticated, isSuperAdmin, deleteAnOrder);
router.delete(
  "/pending/:id",
  isAuthenticated,
  isSuperAdmin,
  deletePendingTransaction
);

export default router;