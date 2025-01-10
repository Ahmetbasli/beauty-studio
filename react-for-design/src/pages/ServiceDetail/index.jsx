import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Star,
  ChevronRight,
  Info,
  CheckCircle,
  Users,
  Timer,
  Sparkles,
  X,
  ChevronDown,
} from "lucide-react";

// Mock data for the service
const serviceData = {
  id: 1,
  name: "Bridal Makeup",
  duration: "120 min",
  price: "$199",
  rating: 4.9,
  reviews: 127,
  image:
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop",
  description:
    "Transform into a radiant bride with our premium bridal makeup service. Using high-end products and expert techniques to ensure your makeup lasts all day and looks stunning in photos.",
  benefits: [
    "Long-lasting makeup that stays perfect for 12+ hours",
    "Premium products suitable for all skin types",
    "Professional lighting setup for perfect application",
    "Includes false lashes and touch-up kit",
  ],
  whatToExpect: [
    "Initial consultation to discuss your desired look",
    "Skin prep and primer application",
    "Full face makeup application",
    "Setting spray for long-lasting wear",
  ],
  additionalInfo: [
    "Trial session recommended (booked separately)",
    "Early morning appointments available",
    "Travel to venue available on request",
    "Bring reference photos if desired",
  ],
  popularWith: [
    "Brides for their special day",
    "Bridal party members",
    "Special occasion celebrations",
    "Professional photoshoots",
  ],
};

const BookingModal = ({ isOpen, onClose, service, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  // Mock available times
  const availableTimes = ["10:00 AM", "2:30 PM", "4:00 PM", "5:30 PM"];

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
        className="w-full max-w-md p-6 mx-4 overflow-hidden bg-background rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Book Appointment</h2>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-full hover:bg-accent/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Service */}
        <div className="p-4 mb-6 border rounded-xl border-border/40 bg-accent/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{service.name}</h3>
            <span className="font-medium text-primary">{service.price}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {service.duration}
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Select Date</label>
          <button className="flex items-center justify-between w-full px-4 py-3 text-left border rounded-xl border-border/40 hover:bg-accent/50">
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
            {availableTimes.map((time, index) => (
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
          onClick={() => {
            onConfirm({ date: selectedDate, time: selectedTime });
            onClose();
          }}
          disabled={!selectedTime}
          className="w-full py-4 font-medium text-white transition-colors rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Booking
        </button>
      </motion.div>
    </motion.div>
  );
};

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBooking = (bookingDetails) => {
    console.log("Booking confirmed:", bookingDetails);
    // Handle booking confirmation
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[300px]">
        <img
          src={serviceData.image}
          alt={serviceData.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate(-1)}
          className="absolute p-2 rounded-full top-4 left-4 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="px-4 -mt-16 relative">
        <div className="p-6 bg-background border border-border/40 rounded-2xl shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold">{serviceData.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {serviceData.duration}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="ml-1 text-sm font-medium">
                    {serviceData.rating}
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    ({serviceData.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
            <span className="text-xl font-semibold text-primary">
              {serviceData.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6">
            {serviceData.description}
          </p>

          {/* Book Now Button */}
          <button
            onClick={() => setShowBookingModal(true)}
            className="w-full py-3 mb-6 font-medium text-white transition-colors rounded-xl bg-primary hover:bg-primary/90"
          >
            Book Now
          </button>

          {/* Benefits */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">Benefits</h2>
              </div>
              <div className="grid gap-2">
                {serviceData.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 mt-0.5 text-primary" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Expect */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Timer className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">What to Expect</h2>
              </div>
              <div className="grid gap-2">
                {serviceData.whatToExpect.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 mt-0.5 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">Additional Information</h2>
              </div>
              <div className="grid gap-2">
                {serviceData.additionalInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 mt-0.5 text-primary" />
                    <span>{info}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular With */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">Popular With</h2>
              </div>
              <div className="grid gap-2">
                {serviceData.popularWith.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 mt-0.5 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <BookingModal
            isOpen={showBookingModal}
            onClose={() => setShowBookingModal(false)}
            service={serviceData}
            onConfirm={handleBooking}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceDetail;
