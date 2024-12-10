import express from "express"
import { allUser, deleteUser, loginUser, logout, registration } from "../controllers/userController.js";
import { isAuthenticated } from './../middlewares/isAuthenticated.js';
import { isAdmin } from './../middlewares/isAdmin.js';

const router = express.Router()

router.post("/registration", registration);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/list", isAuthenticated, isAdmin, allUser)
router.delete("/:id", isAuthenticated, isAdmin, deleteUser)

export default router;