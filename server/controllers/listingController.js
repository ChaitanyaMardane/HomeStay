import prisma from "../prisma/client.js";

export const createListing = async (req, res) => {
  const { title, description, location, price, image } = req.body;
  const priceNumber = Number(price);

  if (!title || !description || !location || isNaN(priceNumber) || !image) {
    return res
      .status(400)
      .json({ message: "All fields are required and price must be a number" });
  }

  // Here, you would typically validate and process the listingData
  //for now we  will just create a listing entry in the database
  const newListing = await prisma.Listing.create({
    data: { title, description, location, price: priceNumber, image },
  });
  res
    .status(201)
    .json({ message: "Listing created successfully", listing: newListing });
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await prisma.Listing.findMany({
      orderBy:{price:"asc"}
    });
    // console.log("✅ Listings fetched:", listings);
    res.status(200).json(listings);
  } catch (error) {
    console.error("❌ Prisma fetch error:", error);
    res.status(500).json({ message: "Error while fetching listings" });
  }
};

export const getListing = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await prisma.Listing.findUnique({
      where: { id: Number(id) },
    });
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    console.log("listing of id :" + id + " :\n");
    console.log(listing);

    res.status(200).json(listing);
  } catch (error) {
    console.error("❌ Prisma fetch error:", error);
    res.status(500).json({ message: "Error while fetching listing" });
  }
};

export const updateListing = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, price, image } = req.body;
  const priceNumber = Number(price);

  if (!title || !description || !location || isNaN(priceNumber) || !image) {
    return res
      .status(400)
      .json({ message: "All fields are required and price must be a number" });
  }

  try {
    const updatedListing = await prisma.Listing.update({
      where: { id: Number(id) },
      data: { title, description, location, price: priceNumber, image },
    });
    res
      .status(200)
      .json({
        message: "Listing updated successfully",
        listing: updatedListing,
      });
  } catch (error) {
    console.error("❌ Prisma update error:", error);
    res.status(500).json({ message: "Error while updating listing" });
  }
};

export const deleteListing = async (req, res) => {
  const {id} = req.params;
  console.log("enter the server to delete" + id);
  
  try {
    const DeletedListing = await prisma.Listing.delete({
      where: { id: Number(id) }, // ensure it's a number if id is Int
    });
  res.status(200).json(DeletedListing);
  } catch (error) {
    console.log(error);
      res.status(500).json({
        status:false,
        message: "failed to delete the error"
      })
    
  }
 
};
