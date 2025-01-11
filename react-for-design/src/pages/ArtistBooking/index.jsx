import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Plus,
  X,
  Info,
  MoreVertical,
  Wallet,
} from "lucide-react";

const ServiceDetailModal = ({ service, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          className="absolute bottom-0 w-full p-6 bg-white rounded-t-[32px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">{service.name}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent/50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Service Image */}
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover rounded-2xl"
            />

            {/* Duration and Price */}
            <div className="flex justify-between items-center">
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-5 h-5 mr-2" />
                <span>{service.duration}</span>
              </div>
              <span className="text-xl font-semibold text-primary">
                {service.price}
              </span>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-muted-foreground">
                {service.description ||
                  "Experience the perfect look with our professional makeup service. Our skilled artists use high-quality products to create stunning looks tailored to your preferences."}
              </p>
            </div>

            {/* What's Included */}
            <div>
              <h4 className="font-medium mb-2">What's Included</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Professional consultation</li>
                <li>• Premium products</li>
                <li>• Complete makeup application</li>
                <li>• Touch-up kit recommendations</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ArtistBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { artistData, selectedService: initialService } = location.state || {};

  const [selectedServices, setSelectedServices] = useState(
    initialService ? [initialService] : []
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedServiceForDetail, setSelectedServiceForDetail] =
    useState(null);

  const handleServiceToggle = (service) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.id === service.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const calculateTotal = () => {
    const servicesTotal = selectedServices.reduce(
      (sum, service) => sum + parseFloat(service.price.replace("$", "")),
      0
    );
    const serviceFee = selectedServices.length * 5; // $5 per service
    const platformFee = 2; // Fixed platform fee
    return {
      servicesTotal,
      serviceFee,
      platformFee,
      total: servicesTotal + serviceFee + platformFee,
    };
  };

  // Generate next 7 days for date selection
  const nextSevenDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleConfirmBooking = () => {
    if (!selectedServices || !selectedTime) return;

    // Here you would typically make an API call to create the booking
    // For now, we'll just navigate to a success page
    navigate(`/booking-success/${id}`, {
      state: {
        service: selectedServices,
        date: selectedDate,
        time: selectedTime,
        artist: artistData,
      },
    });
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  if (!artistData) {
    return navigate("/");
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 transition-colors rounded-full hover:bg-accent/50"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Book Appointment</h1>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Artist Info */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
          <img
            src={artistData.image}
            alt={artistData.name}
            className="object-cover w-16 h-16 rounded-xl"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{artistData.name}</h2>
              {artistData.verified && (
                <div className="p-0.5 rounded-full bg-primary">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {artistData.specialty}
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Select Services</h3>
            <span className="text-sm text-muted-foreground">
              {selectedServices.length} selected
            </span>
          </div>
          <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {artistData.services.map((service) => {
              const isSelected = selectedServices.some(
                (s) => s.id === service.id
              );
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 bg-white border rounded-xl transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border/40"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{service.name}</h4>
                        {isSelected && (
                          <div className="p-0.5 rounded-full bg-primary">
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration}
                      </div>
                    </div>
                    <span className="font-medium text-primary">
                      {service.price}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleServiceToggle(service)}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        isSelected
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : "bg-primary text-white hover:bg-primary/90"
                      }`}
                    >
                      {isSelected ? "Remove" : "Add"}
                    </button>
                    <button
                      onClick={() => setSelectedServiceForDetail(service)}
                      className="py-2 px-4 rounded-lg text-sm font-medium border border-border/40 hover:bg-accent/50 transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Date Selection */}
        <div className="mt-6">
          <h3 className="mb-3 text-lg font-semibold">Select Date</h3>
          <div className="flex gap-3 pb-2 overflow-x-auto">
            {nextSevenDays.map((date, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 p-3 text-sm border rounded-xl ${
                  selectedDate.toDateString() === date.toDateString()
                    ? "border-primary bg-primary/10"
                    : "border-border/40"
                }`}
              >
                {formatDate(date)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="mt-6">
          <h3 className="mb-3 text-lg font-semibold">Select Time</h3>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((time, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedTime(time)}
                className={`p-3 text-sm border rounded-xl ${
                  selectedTime === time
                    ? "border-primary bg-primary/10"
                    : "border-border/40"
                }`}
              >
                {time}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Price Summary Section */}
        <div className="mt-6">
          <h3 className="mb-3 text-lg font-semibold">Price Summary</h3>
          {selectedServices.length > 0 ? (
            <div className="p-4 bg-white border rounded-xl border-border/40">
              {/* Selected Services */}
              <div className="space-y-2 mb-3">
                {selectedServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{service.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration}
                      </div>
                    </div>
                    <span className="font-medium text-primary">
                      {service.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Additional Fees */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Service Fee ($
                    {calculateTotal().serviceFee /
                      selectedServices.length} × {selectedServices.length})
                  </span>
                  <span>${calculateTotal().serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Platform Fee</span>
                  <span>${calculateTotal().platformFee.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
                <span className="font-medium">Total</span>
                <span className="text-lg font-semibold text-primary">
                  ${calculateTotal().total.toFixed(2)}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 text-sm text-center text-muted-foreground bg-white border rounded-xl border-border/40">
              Please select at least one service to see the price summary
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <div className="mt-6 mb-6">
          <div className="p-4 bg-white rounded-2xl space-y-4">
            {/* Payment Method */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">GoPay</h3>
                  <p className="text-sm text-muted-foreground">
                    Balance: $150.00
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-accent/50 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Book Button */}
            <button
              onClick={handleConfirmBooking}
              disabled={selectedServices.length === 0 || !selectedTime}
              className="w-full py-4 font-medium text-lg text-white transition-colors rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceForDetail}
        isOpen={!!selectedServiceForDetail}
        onClose={() => setSelectedServiceForDetail(null)}
      />
    </div>
  );
};

export default ArtistBooking;
