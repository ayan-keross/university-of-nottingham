import { Router } from "express";
import { getAllNotifications } from "../controllers/notification.controller.js";

const router = Router();

router.get("/", getAllNotifications)

export default router;
