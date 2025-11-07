import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Edit, Trash2, MapPin } from "lucide-react";
import { deleteListing } from "../services/listingService";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch listing by ID
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

//   // Delete listing
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    try {
       await deleteListing(listing.id);
      alert("Listing deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error deleting listing:", err);
      alert("Failed to delete listing.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading listing...</p>;
  if (!listing) return <p className="text-center mt-10">Listing not found.</p>;
// const listing={
//     id: 64,
//     title: 'New Listing 1',
//     description: 'this is the genuine lesting after removing the price error',
//     price: 54544,
//     location: 'Malibu',
//     image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
//     // createdAt: 2025-11-06T18:40:52.602Z
//   }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center ">
  <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 mt-20">
    {/* Image */}
    <img
      src={listing.image}
      alt={listing.title}
      className="w-full h-64 object-cover rounded-t-2xl"
    />

    {/* Info */}
    <div className="p-6 sm:p-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-gray-700 mb-4 text-sm font-medium transition"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </button>

      {/* Title + Location */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-1 leading-snug">
        {listing.title}
      </h1>
      <p className="text-gray-500 text-sm mb-5 flex items-center gap-1">
        <MapPin className="h-4 w-4 text-gray-400" /> {listing.location}
      </p>

      {/* Description */}
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
        {listing.description}
      </p>

      {/* Price + Date */}
      <div className="flex items-center justify-between mb-6 border-t border-gray-100 pt-4">
        <span className="text-xl sm:text-2xl font-semibold text-[rgb(249,50,54)]">
          ₹{listing.price}
        </span>
        <span className="text-xs text-gray-400">
          Posted on {new Date(listing.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => navigate(`/listing/edit/${listing.id}`)}
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg shadow-sm text-sm transition"
        >
          <Edit className="h-4 w-4" /> Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg shadow-sm text-sm transition"
        >
          <Trash2 className="h-4 w-4" /> Delete
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default Show;
