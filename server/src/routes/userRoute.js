import express from "express"
import { allUser, login, logout, registration } from "../controllers/userController.js";

const router = express.Router()
router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/list", allUser)

export default router;