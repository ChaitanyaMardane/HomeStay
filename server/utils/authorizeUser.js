import prisma from "../prisma/client.js";

export const authorizeUser= async(req, res , next)=>{
    console.log(" user.id ",req.user.id, "  listing id  ",req.params.id);
    
    const listing =  await prisma.listing.findUnique({
        where:{ id: req.params.id}
    })
    console.log("Listing user id : ",listing.userId);
    
    if(req.user.id==listing.userId){
        
        next();
    }

}