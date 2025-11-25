import prisma from "../prisma/client.js";

export const createListing = async (req, res) => {
  const { title, description, location, price, image, userId } = req.body;
  console.log(req.body);
  
  const priceNumber = Number(price);

  if (
    !title ||
    !description ||
    !location ||
    isNaN(priceNumber) ||
    !image ||
    !userId
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required and price must be a number" });
  }

  // Here, you would typically validate and process the listingData
  //for now we  will just create a listing entry in the database
  const newListing = await prisma.Listing.create({
    data: { title, description, location, price: priceNumber, image, userId },
  });
    res
      .status(201)
      .json({ message: "Listing created successfully", listing: newListing });
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
  include: {
    user: {
      select: { id: true, username: true, email: true },
    },
    reviews: {
     include:{
      user:{
       select:{ username:true,}
      }
     },
      orderBy: { createdAt: "desc" },
    },
  },
  orderBy: { createdAt: "desc" },
});

    
    
    res.status(200).json(listings);
  } catch (error) {
    console.error("❌ Prisma fetch error:", error);
    res.status(500).json({ message: "Error while fetching listings" });
  }
};

export const getListing = async (req, res) => {
  console.log("request erach to get listing in backend ");
  
  // console.log(req);

  const { id } = req.params;

  try {
    const listing = await prisma.Listing.findUnique({
      include: {
        reviews:true,
      },
      where: { id },
    });
    
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    // console.log("Listng with reviews "+ listing);


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
      where: { id },
      data: { title, description, location, price: priceNumber, image },
    });
    res.status(200).json({
      message: "Listing updated successfully",
      listing: updatedListing,
    });
  } catch (error) {
    console.error("❌ Prisma update error:", error);
    res.status(500).json({ message: "Error while updating listing" });
  }
};

export const deleteListing = async (req, res) => {
  const { id } = req.params;

  try {
    const DeletedListing = await prisma.Listing.delete({
      where: { id }, // ensure it's a number if id is Int
    });
    res.status(200).json(DeletedListing);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "failed to delete the error",
    });
  }
};
