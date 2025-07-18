import express from "express";
import {
  getNotifications,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController";

const router = express.Router();

router.get("/", getNotifications);
router.patch("/mark-all-read", markAllAsRead);
router.put("/:id", deleteNotification);

export default router;
