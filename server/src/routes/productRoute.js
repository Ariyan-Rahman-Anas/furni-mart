import express from "express"
import { allCategory, allSubCategory, create, deleteProduct, getCategoryCounts, getSubCategoryCounts, product, productList, searchProduct, updateProduct } from "../controllers/productController.js"
import { multerMiddleware } from "../utils/multer.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router()

router.post("/create",isAuthenticated,  multerMiddleware, create)
router.get("/list", isAuthenticated, isAdmin, productList)
router.get("/search", searchProduct)
router.get("/categories", allCategory);
router.get("/sub-categories", allSubCategory);
router.get("/category-counts", isAuthenticated, isAdmin, getCategoryCounts)
router.get( "/subcategory-counts", isAuthenticated, isAdmin, getSubCategoryCounts);
router.get("/:id", product)
router.put("/:id", isAuthenticated, isAdmin, multerMiddleware, updateProduct);
router.delete("/:id", isAuthenticated, isAdmin, deleteProduct);

export default router;