import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import reviewRoutes from "./routes/reviewsRouters.js"

dotenv.config(); // Load env variables

const app = express();
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "https://homestay-frontend-5xcp.onrender.com", // frontend origin
    credentials: true, // allow cookies / credentials
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/:lid/reviews/",reviewRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} : http://localhost:${PORT}`);
});
