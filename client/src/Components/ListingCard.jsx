import React from "react";

const ListingCard = ({ listing }) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-56 object-cover"
      />

      {/* Info Section */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          {listing.title}
        </h2>
        <p className="text-gray-500 text-sm mb-3">{listing.location}</p>

        <p className="text-gray-700 text-sm mb-4">
          {listing.description.length > 100
            ? listing.description.slice(0, 100) + "..."
            : listing.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">
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
