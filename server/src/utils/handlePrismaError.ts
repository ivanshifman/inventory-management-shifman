import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AppError } from "./appError";

export function handlePrismaError(error: unknown): AppError {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2025":
        return new AppError("Record not found", 404);
      case "P2002":
        return new AppError("Duplicate field", 409);
      default:
        return new AppError("Invalid database request", 400);
    }
  }
  console.error("🔴 Prisma error:", error);
  return new AppError("Unexpected server error", 500);
}
