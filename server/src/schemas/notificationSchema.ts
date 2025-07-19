import { z } from "zod";

export const deleteNotificationSchema = z
  .object({
    params: z.object({
      id: z.uuid("invalid id"),
    }),
    body: z.object({}).optional(),
    query: z.object({}).optional(),
  })
  .strict();
