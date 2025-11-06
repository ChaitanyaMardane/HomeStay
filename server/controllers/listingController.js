import prisma from "../prisma/client.js";

export const createListing = async (req, res) => {
  const  { title,  description,  location,  price,  image} = req.body;
  const priceNumber = Number(price);

  if (!title || !description || !location || isNaN(priceNumber) || !image) {
    return res.status(400).json({ message: "All fields are required and price must be a number" });
  }

 
  // Here, you would typically validate and process the listingData
  //for now we  will just create a listing entry in the database
  const  newListing = await prisma.Listing.create({ data: { title, description, location, price: priceNumber, image } });
  res.status(201).json({ message: "Listing created successfully", listing: newListing });

};

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
