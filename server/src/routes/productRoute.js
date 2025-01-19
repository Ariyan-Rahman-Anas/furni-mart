import express from "express"
import {
  allCategory,
  allSubCategory,
  create,
  deleteProduct,
  getCategoryCounts,
  getSubCategoryCounts,
  productList,
  searchProduct,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { multerMiddleware } from "../utils/multer.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdminOrSuperAdmin, isSuperAdmin } from "../middlewares/isAdmin.js";

const router = express.Router()

router.post("/create",isAuthenticated, isAdminOrSuperAdmin, multerMiddleware, create)
router.get("/list", productList)
router.get("/search", searchProduct)
router.get("/categories", allCategory);
router.get("/sub-categories", allSubCategory);
router.get("/category-counts", isAuthenticated, isAdminOrSuperAdmin, getCategoryCounts)
router.get( "/subcategory-counts", isAuthenticated, isAdminOrSuperAdmin, getSubCategoryCounts);
router.get("/:id", singleProduct)
router.put("/:id", isAuthenticated, isSuperAdmin, multerMiddleware, updateProduct);
router.delete("/:id", isAuthenticated, isSuperAdmin, deleteProduct);

export default router;