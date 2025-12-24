import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  // ✅ Handle Zod validation errors
  if (err.errors && err instanceof ZodError) {
    const formattedErrors = err.errors.map(e => ({
      field: e.path.join("."),
      message: e.message,
    }));

    return res.status(400).json({
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  // ✅ Handle custom errors (if you use createError)
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  } 

  // ✅ Fallback for unknown errors
  console.error("Unhandled error:", err);

  return res.status(500).json({
    message: "Internal server error",
  });
};