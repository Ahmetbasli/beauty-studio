import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  ThumbsUp,
  MessageCircle,
  Image as ImageIcon,
  X,
  Plus,
} from "lucide-react";

// Mock data for reviews
const reviewsData = {
  artist: {
    name: "Sarah Mitchell",
    rating: 4.9,
    reviewCount: 127,
  },
  ratingBreakdown: {
    5: 98,
    4: 20,
    3: 6,
    2: 2,
    1: 1,
  },
  reviewItems: [
    {
      id: 1,
      user: {
        name: "Emma Thompson",
        image: "https://i.pravatar.cc/150?img=5",
      },
      rating: 5,
      date: "2 days ago",
      content:
        "Sarah did an amazing job with my bridal makeup! She understood exactly what I wanted and made me feel so beautiful on my special day. Highly recommend her services!",
      images: [
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
      ],
      likes: 12,
      replies: 2,
    },
    {
      id: 2,
      user: {
        name: "Sophie Chen",
        image: "https://i.pravatar.cc/150?img=9",
      },
      rating: 5,
      date: "1 week ago",
      content:
        "Professional, punctual, and incredibly talented! The makeup lasted all day and looked perfect in photos. Thank you Sarah!",
      images: [
        "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=800&auto=format&fit=crop",
      ],
      likes: 8,
      replies: 1,
    },
    {
      id: 3,
      user: {
        name: "Maria Garcia",
        image: "https://i.pravatar.cc/150?img=3",
      },
      rating: 4,
      date: "2 weeks ago",
      content:
        "Great experience overall! Sarah is very skilled and friendly. The only small issue was that the session ran a bit longer than scheduled.",
      likes: 5,
      replies: 0,
    },
  ],
};

const WriteReviewModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md p-6 mx-4 bg-background rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Write a Review</h2>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-full hover:bg-accent/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rating Selection */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Your Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(value)}
                className="p-1"
              >
                <Star
                  className={`w-8 h-8 ${
                    value <= (hoveredRating || rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Your Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
            className="w-full h-32 px-4 py-3 text-sm border rounded-xl border-border/40 bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Add Photos</label>
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Review ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => {
                    const newImages = [...images];
                    newImages.splice(index, 1);
                    setImages(newImages);
                  }}
                  className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button className="flex items-center justify-center aspect-square rounded-xl border-2 border-dashed border-border/40 hover:bg-accent/50">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={onClose}
          className="w-full py-4 font-medium text-white transition-colors rounded-xl bg-primary hover:bg-primary/90"
        >
          Post Review
        </button>
      </motion.div>
    </motion.div>
  );
};

const ArtistReviews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showWriteReview, setShowWriteReview] = useState(false);

  const calculatePercentage = (count) => {
    return (count / reviewsData.artist.reviewCount) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border/40">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate(`/artist/${id}`)}
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-medium">Reviews</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="ml-1 font-medium">
                {reviewsData.artist.rating}
              </span>
              <span className="ml-1">
                ({reviewsData.artist.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="p-4">
        <div className="p-4 border rounded-2xl border-border/40">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="flex items-center w-12">
                  <span className="text-sm font-medium">{rating}</span>
                  <Star className="w-4 h-4 ml-1 fill-primary text-primary" />
                </div>
                <div className="flex-1 h-2 overflow-hidden bg-accent rounded-full">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${calculatePercentage(
                        reviewsData.ratingBreakdown[rating]
                      )}%`,
                    }}
                  />
                </div>
                <span className="w-12 text-sm text-right text-muted-foreground">
                  {reviewsData.ratingBreakdown[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      <div className="px-4 mb-4">
        <button
          onClick={() => setShowWriteReview(true)}
          className="w-full py-3 font-medium text-white transition-colors rounded-xl bg-primary hover:bg-primary/90"
        >
          Write a Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="p-4 space-y-4">
        {Array.isArray(reviewsData.reviewItems) &&
          reviewsData.reviewItems.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border rounded-2xl border-border/40"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={review.user.image}
                    alt={review.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{review.user.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: review.rating }).map(
                          (_, index) => (
                            <Star
                              key={index}
                              className="w-3 h-3 fill-primary text-primary"
                            />
                          )
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <p className="mb-4 text-sm text-muted-foreground">
                {review.content}
              </p>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-20 h-20 overflow-hidden rounded-xl group"
                    >
                      <img
                        src={image}
                        alt={`Review ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 transition-opacity opacity-0 bg-black/40 group-hover:opacity-100" />
                      <ImageIcon className="absolute w-5 h-5 transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 text-white/90 top-1/2 left-1/2 group-hover:opacity-100" />
                    </div>
                  ))}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{review.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <MessageCircle className="w-4 h-4" />
                  <span>{review.replies}</span>
                </button>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Write Review Modal */}
      <AnimatePresence>
        {showWriteReview && (
          <WriteReviewModal
            isOpen={showWriteReview}
            onClose={() => setShowWriteReview(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtistReviews;
