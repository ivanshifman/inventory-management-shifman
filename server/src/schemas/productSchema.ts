import { z } from "zod";

export const createProductSchema = z
  .object({
    body: z.object({
      name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(255, { message: "Name must be at most 255 characters" }),
      price: z.number().min(0, { message: "Price must be a positive number" }),
      rating: z
        .number()
        .min(0, { message: "Rating must be at least 0" })
        .max(5, { message: "Rating must be at most 5" })
        .optional(),
      stockQuantity: z
        .number()
        .int({ message: "Stock quantity must be an integer" })
        .nonnegative({ message: "Stock quantity cannot be negative" }),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
  })
  .strict();

export const getProductsQuerySchema = z
  .object({
    body: z.undefined().optional(),
    params: z.object({}).optional(),
    query: z.object({
      search: z.string().optional(),
    }),
  })
  .strict();
