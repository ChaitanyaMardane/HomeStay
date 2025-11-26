import React from "react";
import { useEffect } from "react";
import { getAllListings } from "../services/listingService";
import { useState } from "react";
import ListingCard from "../Components/ListingCard";

const Home = () => {
  const [listingData, setListingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchListings = async () => {
    try {
      const data = await getAllListings();
      setListingData(data);
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0,0);
    fetchListings();
  }, []);
  if (loading) return <p className="text-center mt-20">Loading listings...</p>;
  return (
   <div className="container mx-auto px-6">
  <h1 className="font-bold text-3xl mt-20 mb-6 ml-20 lg:text-start md:text-satrt sm:text-center  text-gray-800">
    Listings
  </h1>

  <div className="flex flex-wrap justify-evenly  sm:justify-evenly gap-3  md:gap-3 lg:gap-6">
    {listingData.map((listing) => (
      <ListingCard key={listing.id} listing={listing} />
    ))}
  </div>
</div>
  );
};

export default Home;
