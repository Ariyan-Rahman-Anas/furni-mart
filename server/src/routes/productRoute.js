import express from "express"
import { allCategory, allSubCategory, create, deleteProduct, product, productList, searchProduct } from "../controllers/productController.js"
import { multerMiddleware } from "../utils/multer.js";

const router = express.Router()

router.post("/create", multerMiddleware, create)
router.get("/list", productList)
router.get("/search", searchProduct)
router.get("/categories", allCategory);
router.get("/sub-categories", allSubCategory);
router.get("/:id", product)
router.delete("/:id", deleteProduct)

export default router;