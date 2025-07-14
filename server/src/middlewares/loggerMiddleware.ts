import { Request, Response, NextFunction } from "express";
import logger from "../lib/logger"; 

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl } = req;
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode } = res;

    if (statusCode >= 500) {
      logger.error(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
    } else if (statusCode >= 400) {
      logger.warn(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
    } else {
      logger.info(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
    }
  });

  next();
};
