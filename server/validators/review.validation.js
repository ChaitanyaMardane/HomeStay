import {z} from "zod";

export const createReviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),

  comment: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment too long"),

  listingId: z.string().uuid("Invalid listing ID"),
  userId: z.string().uuid("Invalid listing ID"),
});