import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
dotenv.config(); // Load env variables

const app = express();
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // allow cookies / credentials
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} : http://localhost:${PORT}`);
});
