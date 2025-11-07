import API from "../utils/axios";

const getAllListings = async () => {
  try {
    const response = await API.get("/api/listings");
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
};

const createListing = async (data) => {
  try {
    const response = await API.post("/api/listings", data);
    return response.data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
};
const getListingById = async (id) => {
  try {
    const response = await API.get(`/api/listings/${id}`);
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
    const response =  await API.delete(`http://localhost:5000/api/listings/${id}`, {
    withCredentials: true,
  });
  return response.data;
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
  
};
export { getAllListings, createListing, getListingById, updateListing, deleteListing };
