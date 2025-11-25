
import API from "../utils/axios.js";

// const getAllReviews = async (id) => {
//   try {
//     const response = await API.get(`/api/listings/${id}/reviews`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching listings:", error);
//     throw error;
//   }
// };

const createReview = async (data) => {
    // console.log(`/api/${data.listingId}/reviews`);

  
  try {
    const response = await API.post(`/api/${data.listingId}/reviews`, data);
  // console.log("create reveiew data ", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
};
const getAllReviews = async (id) => {
  
  try {
    const response = await API.get(`/api/${id}/reviews`);
    // console.log("response from service: for reviws ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching listing:", error);
    throw error;
  }
};

const updateListing = async (id, data) => {
  try {
    const response = await API.put(`/api/listings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating listing:", error);
    throw error;
  }
};

const deleteListing = async (id) => {
  try {
    const response = await API.delete(
      `/api/listings/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
};
export {
  createReview,
  getAllReviews,
  updateListing,
  deleteListing,
};
