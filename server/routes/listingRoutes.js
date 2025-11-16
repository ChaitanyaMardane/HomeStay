import express from "express";
import prisma from "../prisma/client.js";
import dotenv from "dotenv";
import {
  createListing,
  deleteListing,
  getAllListings,
  getListing,
  updateListing,
} from "../controllers/listingController.js";
import { protectRoute } from "../controllers/authController.js";
import { authorizeUser } from "../utils/authorizeUser.js";
dotenv.config();

const router = express.Router();

router.post("/", protectRoute, createListing);
router.get("/", getAllListings);
router.get("/:id",protectRoute, getListing);
router.put("/:id", protectRoute,authorizeUser, updateListing);
router.delete("/:id", protectRoute, authorizeUser, deleteListing);
// router.use("/:lid/reviews", reviewRoutes);

export default router;
