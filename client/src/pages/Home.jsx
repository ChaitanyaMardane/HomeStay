import React from 'react'
import { useEffect } from 'react'
import { getAllListings } from '../services/listingService'
import { useState } from 'react'
import ListingCard from '../Components/ListingCard'

const Home = () => {
    const [listingData,setListingData] = useState([]);
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
    useEffect(()=>{
        fetchListings();
    },[])
     useEffect(() => {
    console.log("✅ Listing data updated:", listingData);
  }, [listingData]);
    if (loading) return <p className="text-center mt-20">Loading listings...</p>;
  return (
    <div>
      <h1 className='font-bold text-3xl m-4 ml-18.25 '>Listings</h1>
      <div className='flex flex-wrap justify-evenly gap-4'>
        {listingData.map(listing=> <ListingCard listing={listing}></ListingCard>)}
      
    </div>

    </div>
    
  )
}

export default Home
