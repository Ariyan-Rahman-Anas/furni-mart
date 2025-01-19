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
import { isAdmin, isSuperAdmin } from "../middlewares/isAdmin.js";

const router = express.Router()

router.post("/create",isAuthenticated, isAdmin, multerMiddleware, create)
router.get("/list", productList)
router.get("/search", searchProduct)
router.get("/categories", allCategory);
router.get("/sub-categories", allSubCategory);
router.get("/category-counts", isAuthenticated, isAdmin, getCategoryCounts)
router.get( "/subcategory-counts", isAuthenticated, isAdmin, getSubCategoryCounts);
router.get("/:id", singleProduct)
router.put("/:id", isAuthenticated, isSuperAdmin, multerMiddleware, updateProduct);
router.delete("/:id", isAuthenticated, isSuperAdmin, deleteProduct);

export default router;