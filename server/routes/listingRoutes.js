import express from "express";
import prisma from "../prisma/client.js";
import dotenv from "dotenv";
import { createListing, deleteListing, getAllListings, getListing, updateListing } from "../controllers/listingController.js";
dotenv.config();

const router = express.Router();

router.post("/", createListing);
router.get("/", getAllListings);
router.get("/:id", getListing);
router.put("/:id", updateListing);
router.delete("/:id",deleteListing );


export default router;
