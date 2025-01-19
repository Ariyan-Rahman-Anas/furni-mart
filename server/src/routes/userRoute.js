import express from "express"
import { allUser, deleteUser, googleAuth, loginUser, logout, registration } from "../controllers/userController.js";
import { isAuthenticated } from './../middlewares/isAuthenticated.js';
import {  isAdminOrSuperAdmin, isSuperAdmin } from './../middlewares/isAdmin.js';

const router = express.Router()

router.post("/registration", registration);
router.post("/login", loginUser);
router.post("/google-auth", googleAuth);
router.post("/logout", logout);
router.get("/list", isAuthenticated, isAdminOrSuperAdmin, allUser)
router.delete("/:id", isAuthenticated, isSuperAdmin, deleteUser)

export default router;