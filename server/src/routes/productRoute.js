import express from "express"
import { allCategory, allSubCategory, create, deleteProduct, getCategoryCounts, getSubCategoryCounts, product, productList, searchProduct, updateProduct } from "../controllers/productController.js"
import { multerMiddleware } from "../utils/multer.js";

const router = express.Router()

router.post("/create", multerMiddleware, create)
router.get("/list", productList)
router.get("/search", searchProduct)
router.get("/categories", allCategory);
router.get("/sub-categories", allSubCategory);
router.get("/category-counts", getCategoryCounts)
router.get("/subcategory-counts", getSubCategoryCounts)
router.get("/:id", product)
router.put("/:id", multerMiddleware, updateProduct);
router.delete("/:id", deleteProduct)

export default router;