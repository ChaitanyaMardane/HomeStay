import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlusCircle, Server, ServerIcon } from "lucide-react";
import { getListingById, updateListing } from "../services/listingService";

const EditForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate= useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const listing = await getListingById(id);
      setFormData(listing);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
     await updateListing(id, formData);
    console.log("updated listing : ");
    alert("Listing is updated successfully")
    navigate("/listing/"+id);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          {/* {icon to with better visual not a plusCircle icon} */}
          <ServerIcon className=" " />
          <h1 className="text-2xl font-semibold text-gray-800">
            Update Your Listing
          </h1>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Cozy studio near the city center"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[rgb(249,50,54)] outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your listing..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[rgb(249,50,54)] outline-none transition resize-none"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="City, State, Country"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[rgb(249,50,54)] outline-none transition"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                placeholder="8999"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[rgb(249,50,54)] outline-none transition"
                required
              />
            </div>

            <div className="flex-1 mt-4 sm:mt-0">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[rgb(249,50,54)] outline-none transition"
                required
              />
            </div>
          </div>

          {/* Preview */}
          {formData.image && (
            <div className="mt-4">
              <img
                src={formData.image}
                alt="Preview"
                className="rounded-xl shadow-sm w-full h-56 object-cover border"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[rgb(249,50,54)] text-white font-medium py-3 rounded-xl hover:bg-[rgb(230,40,45)] transition shadow-md mt-4"
          >
            Update Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
