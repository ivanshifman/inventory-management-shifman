import { PrismaClient } from "@prisma/client";
import logger from "./logger";

const prisma = new PrismaClient();

const gracefulShutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("exit", (code) => {
  logger.info(`Process exited with code: ${code}`);
});
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception: %o", err);
  gracefulShutdown();
});
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection: %o", reason);
  gracefulShutdown();
});

export default prisma;
