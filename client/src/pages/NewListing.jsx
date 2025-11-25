import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { createListing } from "../services/listingService";
import { useAuth } from "../Context/AuthContextCreation";

const NewListing = () => {
  const navigate = useNavigate();
  const {user}= useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    image: "",
    userId: user?.id,
  });

    const handleImage = async(event) =>{
        const file = event.target.files[0];

        if(!file)return

        const data = new FormData();
        data.append("file" , file)
        data.append("upload_preset" ,import.meta.env.VITE_UPLOAD_PRESET )
        data.append("cloud_name" , import.meta.env.VITE_CLOUD_NAME)
    
        
     

        const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL , {
            method : "POST",
            body : data
        })
        const uploadImageUrl = await res.json();
       console.log(uploadImageUrl);
        setFormData({ ...formData, [event.target.name]: uploadImageUrl.url });
        console.log(formData.image);
        
       
        
    }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createListing(formData);
      navigate("/");
      alert("Listing created successfully!");
    } catch (err) {
      alert("Failed to create listing." + err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <PlusCircle className="h-6 w-6 text-[rgb(249,50,54)]" />
          <h1 className="text-2xl font-semibold text-gray-800">
            Create a New Listing
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              <label for="image" className="block text-gray-700 text-sm font-medium mb-1">
                upload Image
              </label>
              <input
                type="file"
                name="image"
                placeholder="https://example.com/image.jpg"
                
                onChange={handleImage}
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
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewListing;
