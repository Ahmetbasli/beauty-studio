import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Star,
  MapPin,
  ChevronRight,
  Calendar,
  Check,
  X,
} from "lucide-react";

// Mock data for available services
const availableServices = [
  {
    id: 1,
    name: "Express Makeup",
    duration: "45 min",
    price: "$59",
    category: "Makeup",
  },
  {
    id: 2,
    name: "Quick Hair Styling",
    duration: "30 min",
    price: "$39",
    category: "Hair",
  },
  {
    id: 3,
    name: "Express Manicure",
    duration: "25 min",
    price: "$29",
    category: "Nails",
  },
];

// Mock data for nearby artists
const nearbyArtists = [
  {
    id: 1,
    name: "Sarah Mitchell",
    specialty: "Makeup Artist",
    rating: 4.9,
    distance: "0.8 km",
    availableIn: "15 min",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Emma Davis",
    specialty: "Hair Stylist",
    rating: 4.8,
    distance: "1.2 km",
    availableIn: "30 min",
    image: "https://i.pravatar.cc/150?img=2",
  },
];

const ConfirmationModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-sm p-6 mx-4 bg-background rounded-3xl"
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-primary/10">
            <Check className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground">
            Your appointment has been scheduled for
          </p>
          <p className="font-medium text-foreground mt-1">
            Today, in {booking.artist.availableIn}
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-accent/50 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={booking.artist.image}
              alt={booking.artist.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium">{booking.artist.name}</h3>
              <p className="text-sm text-muted-foreground">
                {booking.artist.specialty}
              </p>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="ml-1 text-sm font-medium text-primary">
                  {booking.artist.rating}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Service</span>
              <span className="text-sm font-medium">
                {booking.service.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Duration</span>
              <span className="text-sm font-medium">
                {booking.service.duration}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="text-sm font-medium text-primary">
                {booking.service.price}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-medium"
          >
            View Booking Details
          </button>
          <button
            onClick={() => onClose("home")}
            className="w-full py-3 px-4 bg-accent hover:bg-accent/80 text-foreground rounded-xl font-medium"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const QuickBook = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleArtistSelect = (artist) => {
    setSelectedArtist(artist);
    setCurrentBooking({
      service: selectedService,
      artist: artist,
    });
    setShowConfirmation(true);
  };

  const handleConfirmationClose = (destination) => {
    setShowConfirmation(false);
    if (destination === "home") {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border/40">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate("/home")}
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-medium">Quick Book</h1>
            <p className="text-sm text-muted-foreground">Service in 60 mins</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Location Info */}
        <div className="bg-primary/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-medium">Current Location</span>
            </div>
            <button className="text-sm text-primary">Change</button>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing services and artists near you
          </p>
        </div>

        {/* Available Services */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Express Services</h2>
            <div className="flex items-center text-sm text-primary">
              <Clock className="w-4 h-4 mr-1" />
              Next 60 min
            </div>
          </div>
          <div className="grid gap-3">
            {availableServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border rounded-2xl cursor-pointer transition-all ${
                  selectedService?.id === service.id
                    ? "border-primary bg-primary/5"
                    : "border-border/40 hover:bg-accent/50"
                }`}
                onClick={() => handleServiceSelect(service)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-primary font-medium">
                      {service.price}
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">
                      Express Service
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {selectedService && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Available Artists</h2>
              <div className="flex items-center text-sm text-primary">
                <MapPin className="w-4 h-4 mr-1" />
                Within 2km
              </div>
            </div>
            <div className="space-y-3">
              {nearbyArtists.map((artist) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 border rounded-2xl cursor-pointer transition-all ${
                    selectedArtist?.id === artist.id
                      ? "border-primary bg-primary/5"
                      : "border-border/40 hover:bg-accent/50"
                  }`}
                  onClick={() => handleArtistSelect(artist)}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{artist.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {artist.specialty}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="ml-1 text-sm font-medium text-primary">
                            {artist.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          {artist.distance} away
                        </div>
                        <div className="flex items-center text-sm text-primary">
                          <Clock className="w-4 h-4 mr-1" />
                          Available in {artist.availableIn}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <ConfirmationModal
            isOpen={showConfirmation}
            onClose={handleConfirmationClose}
            booking={currentBooking}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickBook;
