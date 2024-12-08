import express from "express"
import { allUser, deleteUser, login, logout, registration } from "../controllers/userController.js";

const router = express.Router()
router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/list", allUser)
router.delete("/:id", deleteUser)

export default router;