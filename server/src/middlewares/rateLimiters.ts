import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

export const notificationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  message: "Too many requests to notifications, please slow down.",
});
