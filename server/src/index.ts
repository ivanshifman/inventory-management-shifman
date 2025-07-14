import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import dashboardRoutes from "./routes/dashboardRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { AppError } from "./utils/appError";
import logger from "./lib/logger";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(loggerMiddleware);

app.use("/dashboard", dashboardRoutes);

app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});