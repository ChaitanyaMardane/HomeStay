import prisma from "../prisma/client.js";

export const createListing = async (req, res) => {};

export const getAllListings = async (req, res) => {
  try {
    const listings = await prisma.Listing.findMany({    });
    console.log("✅ Listings fetched:", listings);
    res.status(200).json(listings);
 } catch (error) {
  console.error("❌ Prisma fetch error:", error);
  res.status(500).json({ message: "Error while fetching listings" });
}
};

export const getListing = async (req, res) => {};

export const updateListing = async (req, res) => {};

export const deleteListing = async (req, res) => {};
