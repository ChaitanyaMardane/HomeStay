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
  const [loading, setLoading] = useState(listing?false:true);
  const { user } = useAuth();
  const [reviews, setReviews] = useState(state?.listing.reviews || []);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    userId: user.id,
    listingId: id,
  });

  useEffect(() => {
    setListing(state?.listing);
    if (!listing) {
      fetchListing();
    } else {
      setLoading(false);
    }
  }, [id]);
  useEffect(()=>{},[reviews]);

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
      
      
      // Optionally update reviews state here if needed
      navigate(`/listing/${id}`)
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
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mt-20">
        <div className="relative">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-72 object-cover rounded-t-2xl"
          />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full text-gray-600 hover:text-gray-900 shadow-md transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {listing.title}
              </h1>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-400" /> {listing.location}
              </p>
            </div>

            {listing.userId === user?.id && (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/listing/edit/${listing.id}`)}
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm transition"
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed mt-5 mb-8">
            {listing.description}
          </p>

          <div className="flex justify-between items-center border-t border-gray-100 pt-4">
            <span className="text-2xl font-semibold text-[rgb(249,50,54)]">
              ₹{listing.price}
            </span>
            <span className="text-xs text-gray-400">
              Posted on {new Date(listing.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-10 border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" /> Reviews
            </h2>
            <div className="space-y-4">
              {reviews.map((r) => (
                <ReviewCard r={r} key={r.id} />
              ))}
            </div>
            {user && (
              <form
                onSubmit={handleReviewSubmit}
                className="mt-6 flex flex-col gap-3 border-t pt-4"
              >
                <select
                  name="rating"
                  value={newReview.rating}
                  onChange={handleChange}
                  className="p-2 border rounded-lg text-sm"
                  required
                >
                  <option value="">Select rating</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 && "s"}
                    </option>
                  ))}
                </select>

                <textarea
                  name="comment"
                  placeholder="Write your review..."
                  value={newReview.comment}
                  onChange={handleChange}
                  className="p-3 border rounded-lg text-sm focus:ring-1 focus:ring-[rgb(249,50,54)]"
                  required
                />

                <button
                  type="submit"
                  className="self-end bg-[rgb(249,50,54)] text-white px-4 py-2 rounded-lg hover:bg-[rgb(230,40,45)] text-sm transition"
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