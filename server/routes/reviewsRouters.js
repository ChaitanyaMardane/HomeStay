import express from "express";
import prisma from "../prisma/client.js";
import dotenv from "dotenv";
import {
  createReview,
  deleteReview,
  getAllReviews,
  updateReview,
} from "../controllers/reviewController.js";
import { protectRoute } from "../controllers/authController.js";
import { authorizeUser } from "../utils/authorizeUser.js";
dotenv.config();

const router = express.Router({ mergeParams: true });

router.post("/", protectRoute, createReview);
router.get("/", getAllReviews);
router.put("/:id", protectRoute, authorizeUser, updateReview);
router.delete("/:id", protectRoute, authorizeUser, deleteReview);

export default router;
