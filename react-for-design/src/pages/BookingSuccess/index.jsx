import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { service, date, time, artist } = location.state || {};

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/home")}
              className="p-2 transition-colors rounded-full hover:bg-accent/50"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Booking Confirmation</h1>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Success Message */}
        <div className="flex flex-col items-center justify-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mb-6 bg-primary/10 rounded-full flex items-center justify-center"
          >
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold text-center mb-2"
          >
            Booking Confirmed!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center text-muted-foreground"
          >
            Your appointment has been successfully scheduled
          </motion.p>
        </div>

        {/* Booking Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 space-y-4"
        >
          {/* Artist Info */}
          <div className="flex items-center gap-4">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{artist.name}</h3>
                {artist.verified && (
                  <div className="p-0.5 rounded-full bg-primary">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{artist.specialty}</p>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Services</h4>
            {Array.isArray(service) ? (
              service.map((s) => (
                <div key={s.id} className="flex justify-between items-center">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-primary font-medium">{s.price}</span>
                </div>
              ))
            ) : (
              <div className="flex justify-between items-center">
                <span className="font-medium">{service.name}</span>
                <span className="text-primary font-medium">{service.price}</span>
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(date)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{artist.location}</span>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 space-y-4"
        >
          <h3 className="font-semibold">Next Steps</h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/bookings")}
              className="w-full p-4 bg-white rounded-xl flex items-center justify-between group hover:bg-accent/50 transition-colors"
            >
              <span className="font-medium">View Booking Details</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
            <button
              onClick={() => navigate("/home")}
              className="w-full p-4 bg-white rounded-xl flex items-center justify-between group hover:bg-accent/50 transition-colors"
            >
              <span className="font-medium">Back to Home</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingSuccess; 