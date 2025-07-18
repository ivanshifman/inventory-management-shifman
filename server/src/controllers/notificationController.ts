import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";
import { handlePrismaError } from "../utils/handlePrismaError";

export const getNotifications = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(notifications);
  } catch (error) {
    next(handlePrismaError(error));
  }
};

export const markAllAsRead = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.notification.updateMany({
      data: { isRead: true },
    });
    res.sendStatus(200);
  } catch (error) {
    next(handlePrismaError(error));
  }
};

export const deleteNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.notification.update({
      where: { id },
      data: { isRead: true, isDeleted: true },
    });

    res.sendStatus(200);
  } catch (error) {
    next(handlePrismaError(error));
  }
};
