import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import { handlePrismaError } from "../utils/handlePrismaError";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    next(handlePrismaError(error));
  }
};
