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

export { getAllListings };