import express from 'express';
import { getSingleSubscriber, getSubscribers, makeSubscribed } from '../controllers/subscriptionController.js';
import { isAdminOrSuperAdmin } from '../middlewares/isAdmin.js';

const router = express.Router()

router.post("/create", makeSubscribed)
router.get("/list", isAdminOrSuperAdmin, getSubscribers)
router.get("/:email", getSingleSubscriber)

export default router