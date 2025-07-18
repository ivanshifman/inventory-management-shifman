import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import dashboardRoutes from "./routes/dashboardRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { AppError } from "./utils/appError";
import logger from "./lib/logger";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import {
  generalLimiter,
  notificationLimiter,
} from "./middlewares/rateLimiters";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(loggerMiddleware);
app.use(generalLimiter);

app.use("/dashboard", dashboardRoutes);
app.use("/expenses", expenseRoutes);
app.use("/notifications", notificationLimiter, notificationRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
