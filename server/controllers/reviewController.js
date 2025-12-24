import { createReviewSchema } from "../validators/review.validation.js";
import prisma from "../prisma/client.js";
import { tr } from "zod/v4/locales";

export const createReview = async (req, res) => {
    console.log("in backend");
    try {
    const validationResult = createReviewSchema.parse(req.body);
    console.log("validationResult",validationResult.data);
    
  const { userId, listingId, comment, rating } = validationResult.data;
  console.log( "review recieved in backend",req.body)
  
    const newReview = await prisma.Review.create({
      data: {
        userId,
        listingId,
        comment,
        rating:Number(rating),
      },
    });
console.log("Review Created Successfully : ",newReview);
 res
    .status(201)
    .json({ message: "Review created successfully", review: newReview });

  } catch (error) {
    console.log( "Error in creating review :", error.errors.message);
    res.status(500).json("Error " , error)
    
  }
};

export const getAllReviews = async (req, res) => {
  console.log("you reached the  get all review");
  const {lid} = req.params;
  // console.log(lid );
  
  
  try{
    const reviews  = await prisma.Review.findMany({
    where:{listingId:lid},
    include:{
      user:{
       select: {
            username: true
          }
      }
    }
  })
  // console.log("This is the reviewws : ", reviews);
  res.json(reviews);

  }catch (error) {
    console.log(error);
    res.json(error);
    
  }
 
};

export const updateReview = async(req, res) => {};

export const deleteReview = async(req, res) => {};
