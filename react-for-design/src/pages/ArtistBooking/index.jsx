import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const ArtistBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { artistData, selectedService: initialService } = location.state || {};

  const [selectedService, setSelectedService] = useState(initialService);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

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
    if (!selectedService || !selectedTime) return;

    // Here you would typically make an API call to create the booking
    // For now, we'll just navigate to a success page
    navigate(`/booking-success/${id}`, {
      state: {
        service: selectedService,
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
          <h3 className="mb-3 text-lg font-semibold">Select Service</h3>
          <div className="space-y-3">
            {artistData.services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedService(service)}
                className={`p-4 bg-white border cursor-pointer rounded-xl ${
                  selectedService?.id === service.id
                    ? "border-primary"
                    : "border-border/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{service.name}</h4>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </div>
                  </div>
                  <span className="font-medium text-primary">
                    {service.price}
                  </span>
                </div>
              </motion.div>
            ))}
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
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={handleConfirmBooking}
          disabled={!selectedService || !selectedTime}
          className="w-full py-4 font-medium text-white transition-colors rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default ArtistBooking;
