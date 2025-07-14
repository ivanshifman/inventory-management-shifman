import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import logger from "../lib/logger";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const isOperational = err instanceof AppError;

  if (statusCode >= 500) {
    logger.error("Unhandled error: %o", err);
  } else {
    logger.warn("Operational error: %s", err.message);
  }

  res.status(statusCode).json({
    status: "error",
    message: isOperational ? err.message : "Something went wrong",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};


