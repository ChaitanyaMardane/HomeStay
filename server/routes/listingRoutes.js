import express from "express";
import prisma from "../prisma/client.js";
import dotenv from "dotenv";
import { getAllListings } from "../controllers/listingController.js";
dotenv.config();

const router = express.Router();

// router.post("/", );
router.get("/", getAllListings);
// router.get("/:id", );
// router.put("/:id", );
// router.delete("/:id", );


export default router;
