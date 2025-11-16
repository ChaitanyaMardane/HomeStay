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
    fetchListings();
  }, []);
  useEffect(() => {}, [listingData]);
  if (loading) return <p className="text-center mt-20">Loading listings...</p>;
  return (
    <div className="">
      <h1 className="font-bold text-3xl m-4 ml-18.25 mt-20 ">Listings</h1>
      <div className="flex flex-wrap justify-evenly gap-4">
        {listingData.map((listing) => (
          <ListingCard key={listing.id} listing={listing}></ListingCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
