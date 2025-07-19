import express from "express";
import {
  getNotifications,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController";
import { validate } from "../middlewares/validate";
import { deleteNotificationSchema } from "../schemas/notificationSchema";

const router = express.Router();

router.get("/", getNotifications);
router.patch("/mark-all-read", markAllAsRead);
router.put("/:id", validate(deleteNotificationSchema), deleteNotification);

export default router;
