import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, MapPin, Star } from "lucide-react";
import { deleteListing, getListingById } from "../services/listingService";
import { useAuth } from "../Context/AuthContextCreation";
import ReviewCard from "../Components/ReviewCard";
import { createReview, getAllReviews } from "../services/reviewService";

const Show = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [listing, setListing] = useState(state?.listing || null);
  const [loading, setLoading] = useState(listing ? false : true);
  const { user } = useAuth();
  const [reviews, setReviews] = useState(state?.listing.reviews || []);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    userId: user.id,
    listingId: id,
  });

  useEffect(() => {
    window.scrollTo(0,0);
    setListing(state?.listing);
    if (!listing) {
      fetchListing();
    } else {
      setLoading(false);
    }

  }, []);
  useEffect(() => {}, [reviews]);

  const fetchListing = async () => {
    try {
      const res = await getListingById(id);
      setListing(res);
    } catch (err) {
      console.error("Error fetching listing:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (id) => {
    try {
      const res = await getAllReviews(id);
      return res;
    } catch (err) {
      console.error("Error fetching listing:", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview(newReview);
      const allReviews = await fetchReviews(id);
      setReviews(allReviews);
      setNewReview({
    rating: 0,
    comment: "",
    userId: user.id,
    listingId: id,
  });

      // Optionally update reviews state here if needed
      navigate(`/listing/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
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

  return (
    <div className="min-h-screen bg-gray-50 pb-16 flex justify-center px-4">
  <div className="w-full max-w-4xl">

    {/* Hero Section */}
    <div className="relative mt-20 rounded-3xl overflow-hidden shadow-md">
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-[400px] object-cover"
      />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full shadow hover:shadow-md transition"
      >
        <ArrowLeft className="h-5 w-5 text-gray-600" />
      </button>
    </div>

    {/* Floating Content Card */}
    <div className="relative -mt-12 bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
      
      {/* Title + Location */}
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          {listing.title}
        </h1>

        <p className="text-gray-500 text-sm flex items-center gap-1">
          <MapPin className="h-4 w-4 text-gray-400" /> {listing.location}
        </p>
      </div>

      {/* Owner Actions */}
      {listing.userId === user?.id && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigate(`/listing/edit/${listing.id}`)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition shadow-sm"
          >
            <Edit className="h-4 w-4" /> Edit Listing
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition shadow-sm"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      )}

      {/* Description */}
      <p className="text-gray-700 text-base leading-relaxed mt-6 mb-8">
        {listing.description}
      </p>

      {/* Price + Posted */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl">
        <span className="text-3xl font-bold text-[rgb(249,50,54)]">
          ₹{listing.price}
        </span>

        <span className="text-xs text-gray-500">
          Posted on {new Date(listing.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-500" /> Guest Reviews
        </h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No reviews yet.</p>
        ) : (
          <div className="space-y-5">
            {reviews.map((r) => (
              <ReviewCard r={r} key={r.id} />
            ))}
          </div>
        )}

        {/* Add Review Box */}
        {user && (
          <form
            onSubmit={handleReviewSubmit}
            className="mt-8 border-t pt-6 flex flex-col gap-4"
          >
            <select
              name="rating"
              value={newReview.rating}
              onChange={handleChange}
              className="p-3 border rounded-lg text-sm focus:ring-[rgb(249,50,54)] bg-gray-50"
              required
            >
              <option value="">Your rating</option>
              {[1,2,3,4,5].map(r => (
                <option key={r} value={r}>{r} Star{r>=1 && "s"}</option>
              ))}
            </select>

            <textarea
              name="comment"
              placeholder="Share your experience..."
              value={newReview.comment}
              onChange={handleChange}
              className="p-4 border rounded-lg text-sm min-h-[90px] focus:ring-[rgb(249,50,54)] bg-gray-50"
              required
            />

            <button
              type="submit"
              className="self-end bg-[rgb(249,50,54)] hover:bg-[rgb(230,40,45)] text-white px-5 py-2 rounded-lg text-sm transition shadow"
            >
              Post Review
            </button>
          </form>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default Show;
