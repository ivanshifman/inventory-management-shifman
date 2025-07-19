import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { AppError } from "../utils/appError";

export const validate =
  (
    schema: ZodType<{
      body?: unknown;
      query?: unknown;
      params?: unknown;
    }>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const issues = result.error.issues.map((i) => {
        if (process.env.NODE_ENV === "production") {
          const field = i.path.length
            ? String(i.path[i.path.length - 1])
            : "field";
          return `${field}: ${i.message}`;
        } else {
          return `${i.path.join(".")}: ${i.message}`;
        }
      });
      return next(new AppError(`Validation failed: ${issues.join(", ")}`, 400));
    }

    const parsed = result.data;

    if (parsed.body) Object.assign(req.body, parsed.body);
    if (parsed.query) Object.assign(req.query, parsed.query);
    if (parsed.params) Object.assign(req.params, parsed.params);

    next();
  };
