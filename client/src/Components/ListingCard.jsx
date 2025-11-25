import React from "react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  return (
   <div
  className="w-full max-w-sm bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  onClick={() => {
    navigate(`/listing/${listing.id}`, { state: { listing } });
  }}
>
  {/* Image */}
  <div className="w-full h-56 overflow-hidden">
    <img
      src={listing.image}
      alt={listing.title}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Info Section */}
  <div className="p-4">
    <h2 className="text-xl font-semibold text-gray-800 mb-1">
      {listing.title}
    </h2>

    <p className="text-gray-500 text-sm mb-2">
      {listing.location}
    </p>

    <p className="text-gray-700 text-sm leading-relaxed mb-4">
      {listing.description.length > 100
        ? listing.description.slice(0, 100) + "..."
        : listing.description}
    </p>

    <div className="flex items-center justify-between mt-2">
      <span className="text-lg font-bold text-[rgb(249,50,54)]">
        ₹{listing.price}
      </span>
      <span className="text-xs text-gray-400">
        {new Date(listing.createdAt).toLocaleDateString()}
      </span>
    </div>
  </div>
</div>

  );
};

export default ListingCard;
