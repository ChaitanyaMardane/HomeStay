import { z } from "zod";

export const createListingSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title too long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description too long"),

  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0"),

  location: z
    .string()
    .min(2, "Location is required")
    .max(100, "Location too long"),

  image: z
    .string()
    .url("Image must be a valid URL")
    .optional(),

    userId: z
    .string()
    .uuid("Invalid user ID"),

});