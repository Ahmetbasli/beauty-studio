import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  MapPin,
  Share2,
  Heart,
  MessageCircle,
  Clock,
  Calendar,
  ChevronRight,
  Image as ImageIcon,
  CheckCircle2,
  X,
  ChevronDown,
  Edit2,
  Camera,
} from "lucide-react";

// Mock data for the artist
const artistData = {
  id: 1,
  name: "Sarah Mitchell",
  specialty: "Makeup Artist",
  rating: 4.9,
  reviewCount: 127,
  location: "Denpasar, Bali",
  distance: "2.3 km away",
  image: "https://i.pravatar.cc/300?img=2",
  verified: true,
  description:
    "Professional makeup artist with 8+ years of experience specializing in bridal, editorial, and natural makeup looks. Featured in Vogue and Elle magazines.",
  services: [
    {
      id: 1,
      name: "Bridal Makeup",
      duration: "120 min",
      price: "$199",
      image:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Natural Makeup",
      duration: "60 min",
      price: "$89",
      image:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Party Makeup",
      duration: "90 min",
      price: "$129",
      image:
        "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=800&auto=format&fit=crop",
    },
  ],
  portfolio: [
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522337094846-8a818192de1f?q=80&w=800&auto=format&fit=crop",
  ],
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
    },
  ],
  availability: {
    today: ["10:00 AM", "2:30 PM", "4:00 PM"],
    tomorrow: ["9:00 AM", "11:30 AM", "3:00 PM", "5:30 PM"],
  },
};

const BookingModal = ({
  isOpen,
  onClose,
  artistData,
  navigate,
  id,
  selectedService,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("10:00");

  const handleConfirm = () => {
    if (selectedTime && selectedService) {
      onClose();
      navigate(`/payment/${id}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="p-6 mx-4 w-full max-w-md bg-white rounded-2xl"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Book Appointment</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors hover:bg-accent/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Service */}
        <div className="p-4 mb-6 rounded-xl border border-border/40 bg-accent/50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{selectedService?.name}</h3>
            <span className="font-medium text-primary">
              {selectedService?.price}
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 w-4 h-4" />
            {selectedService?.duration}
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Select Date</label>
          <button className="flex justify-between items-center px-4 py-3 w-full text-left rounded-xl border border-border/40 hover:bg-accent/50">
            <span>{selectedDate.toLocaleDateString()}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Time Slots */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">
            Available Times
          </label>
          <div className="grid grid-cols-3 gap-2">
            {artistData.availability.today.map((time, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(time)}
                className={`px-4 py-2 text-sm font-medium transition-colors border rounded-lg ${
                  selectedTime === time
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/40 hover:bg-accent/50"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Booking Button */}
        <button
          onClick={handleConfirm}
          disabled={!selectedTime || !selectedService}
          className="py-4 w-full font-medium text-white rounded-xl transition-colors bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Book Now
        </button>
      </motion.div>
    </div>
  );
};

const ArtistProfile = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const transformValue = Math.min(position * 0.5, 100);
      setScrollPosition(transformValue);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header Image Section with Edit Button */}
      <div className="relative h-[300px]">
        <img
          src={artistData.image}
          alt={artistData.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

        {/* Edit Photo Button */}
        <button
          onClick={() => navigate("/artist/profile/edit-photo")}
          className="absolute right-4 bottom-12 p-3 rounded-full backdrop-blur-sm transition-all bg-white/90 hover:bg-white"
        >
          <Camera className="w-5 h-5" />
        </button>

        {/* Header Actions */}
        <div className="flex absolute top-0 right-0 left-0 justify-between items-center p-4">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-full backdrop-blur-sm transition-colors bg-white/90 hover:bg-white"
          >
            <ArrowLeft className="w-5 h-5 text-secondary-800" />
          </motion.button>
        </div>
      </div>

      {/* Content Container */}
      <div
        className="relative z-10 bg-[#FAFAFA] rounded-t-[16px] overflow-hidden -mt-8"
        style={{
          transform: `translateY(-${scrollPosition}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Artist Info Section */}
        <div className="relative bg-white rounded-t-[32px] px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex gap-2 items-center">
                <h1 className="text-2xl font-semibold">{artistData.name}</h1>
                {artistData.verified && (
                  <div className="p-0.5 rounded-full bg-primary">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-muted-foreground">{artistData.specialty}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="ml-1 font-medium">{artistData.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {artistData.reviewCount} reviews
              </span>
            </div>
          </div>

          <div className="flex gap-4 items-center mt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 w-4 h-4" />
              {artistData.location}
            </div>
            <div className="text-sm text-muted-foreground">
              {artistData.distance}
            </div>
          </div>

          {/* Bio Section with Edit Button */}
          <div className="mt-4">
            <p className="inline-block text-sm text-muted-foreground">
              {artistData.description}
            </p>
            <button
              onClick={() => navigate("/artist/profile/edit-bio")}
              className="inline-flex items-center gap-1 ml-2 text-sm font-medium text-[#F2994A] hover:text-[#F2994A]/90 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>

        {/* Services Section */}
        <div className="px-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Services</h2>
            <button
              onClick={() => navigate("/artist/profile/edit-services")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
          <div className="space-y-4">
            {artistData.services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 p-4 bg-white rounded-2xl border shadow-sm transition-all border-border/40 hover:shadow-md group"
              >
                <div className="flex flex-1 gap-4">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="object-cover w-20 h-20 rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{service.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <Clock className="mr-1 w-4 h-4" />
                      {service.duration}
                    </div>
                    <p className="mt-2 text-sm font-medium text-primary">
                      {service.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="px-4 mt-8 mb-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Portfolio</h2>
            <button
              onClick={() => navigate("/artist/profile/edit-portfolio")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {artistData.portfolio.slice(0, 6).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden relative rounded-xl cursor-pointer aspect-square group"
              >
                <img
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="object-cover w-full h-full transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 opacity-0 transition-opacity bg-black/40 group-hover:opacity-100" />
                <ImageIcon className="absolute top-1/2 left-1/2 w-6 h-6 opacity-0 transition-opacity -translate-x-1/2 -translate-y-1/2 text-white/90 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="px-4 mt-8 mb-20">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 items-center">
              <h2 className="text-lg font-semibold">Reviews</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="ml-1 font-medium">{artistData.rating}</span>
                <span className="ml-1">({artistData.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {Array.isArray(artistData.reviewItems) &&
              artistData.reviewItems.slice(0, 2).map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl border border-border/40"
                >
                  <div className="flex gap-3 items-start mb-3">
                    <img
                      src={review.user.image}
                      alt={review.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{review.user.name}</h3>
                      <div className="flex gap-2 items-center">
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
                  <p className="text-sm text-muted-foreground">
                    {review.content}
                  </p>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
