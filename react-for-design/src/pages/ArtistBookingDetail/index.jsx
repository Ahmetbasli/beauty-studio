import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Check,
  X,
  MessageCircle,
  Phone,
  Mail,
  DollarSign,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

// Using the same mock data from ArtistBookings
const mockBookings = [
  {
    id: 1,
    customerName: "Emma Wilson",
    customerImage: "https://i.pravatar.cc/150?img=1",
    customerPhone: "+1 234-567-8900",
    customerEmail: "emma.wilson@example.com",
    service: "Hair Coloring",
    date: "Today",
    time: "2:00 PM",
    duration: "120 min",
    location: "Your Studio",
    status: "pending",
    price: "Rp 850.000",
    notes: "Allergic to certain hair dyes, please check before proceeding",
    bookedAt: "2024-02-20T10:30:00Z",
  },
  {
    id: 2,
    customerName: "Sophie Brown",
    customerImage: "https://i.pravatar.cc/150?img=2",
    customerPhone: "+1 234-567-8901",
    customerEmail: "sophie.brown@example.com",
    service: "Makeup",
    date: "Today",
    time: "4:30 PM",
    duration: "90 min",
    location: "Your Studio",
    status: "confirmed",
    price: "Rp 650.000",
    notes: "Natural look preferred, bringing reference photos",
    bookedAt: "2024-02-19T15:45:00Z",
  },
];

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium border rounded-full ${getStatusStyles()}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  confirmButtonClass,
  icon: Icon,
}) => {
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
        className="w-full max-w-sm p-6 mx-4 bg-background rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#D4B48D]">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">{title}</h3>
          <p className="mb-6 text-base text-[#6B7280]">{description}</p>
          <div className="grid w-full grid-cols-2 gap-3">
            <button
              onClick={onClose}
              className="py-3 font-medium border rounded-xl hover:bg-accent"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`py-3 font-medium text-white rounded-xl ${confirmButtonClass}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ArtistBookingDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const booking = mockBookings.find((b) => b.id === parseInt(id));
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  if (!booking) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-10 border-b backdrop-blur-xl bg-background/80 border-border/40">
          <div className="p-4">
            <button
              onClick={() => navigate("/artist/bookings")}
              className="p-2 rounded-lg transition-colors hover:bg-accent"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </header>
        <div className="flex flex-col justify-center items-center flex-1 p-4">
          <p className="text-lg font-medium">Booking not found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            The booking you're looking for doesn't exist
          </p>
        </div>
      </div>
    );
  }

  const handleAcceptConfirm = () => {
    console.log("Accepted booking:", id);
    setShowAcceptModal(false);
    navigate("/artist/bookings");
  };

  const handleDeclineConfirm = () => {
    console.log("Declined booking:", id);
    setShowDeclineModal(false);
    navigate("/artist/bookings");
  };

  const handleComplete = () => {
    console.log("Completed booking:", id);
    navigate("/artist/bookings");
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b backdrop-blur-xl bg-background/80 border-border/40">
          <div className="p-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate("/artist/bookings")}
                className="p-2 rounded-lg transition-colors hover:bg-accent"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <StatusBadge status={booking.status} />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4">
          {/* Customer Info */}
          <div className="flex gap-4 items-center p-4 mb-6 rounded-xl border border-border/40">
            <img
              src={booking.customerImage}
              alt={booking.customerName}
              className="object-cover w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-lg font-medium">{booking.customerName}</h2>
              <p className="text-sm text-muted-foreground">{booking.service}</p>
            </div>
          </div>

          {/* Service Details */}
          <div className="p-4 mb-6 rounded-xl border border-border/40">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium">{booking.service}</h3>
                <p className="text-sm text-muted-foreground">
                  Duration: {booking.duration}
                </p>
              </div>
              <span className="text-lg font-medium">{booking.price}</span>
            </div>
          </div>

          {/* Booking Details */}
          <div className="p-4 mb-6 space-y-4 rounded-xl border border-border/40">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Date
                </h3>
                <div className="flex gap-2 items-center">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{booking.date}</span>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Time
                </h3>
                <div className="flex gap-2 items-center">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{booking.time}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Location
              </h3>
              <div className="flex gap-2 items-center">
                <MapPin className="w-4 h-4 text-primary" />
                {booking.location === "Your Studio" ? (
                  <button
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          booking.location
                        )}`,
                        "_blank"
                      );
                    }}
                    className="font-medium text-primary hover:underline"
                  >
                    Open in Maps
                  </button>
                ) : (
                  <span>{booking.location}</span>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="p-4 mb-6 space-y-2 rounded-xl border border-border/40">
              <h3 className="font-medium">Customer Notes</h3>
              <p className="text-sm text-muted-foreground">{booking.notes}</p>
            </div>
          )}

          {/* Booking Time */}
          <div className="p-4 mb-6 space-y-2 text-sm rounded-xl border border-border/40 bg-accent/50">
            <p className="text-muted-foreground">
              Booked on {new Date(booking.bookedAt).toLocaleDateString()} at{" "}
              {new Date(booking.bookedAt).toLocaleTimeString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid gap-3">
            {booking.status === "pending" && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowAcceptModal(true)}
                  className="flex gap-2 justify-center items-center py-3 font-medium text-white bg-emerald-600 rounded-xl transition-colors hover:bg-emerald-700"
                >
                  <Check className="w-5 h-5" />
                  Accept
                </button>
                <button
                  onClick={() => setShowDeclineModal(true)}
                  className="flex gap-2 justify-center items-center py-3 font-medium text-white bg-red-600 rounded-xl transition-colors hover:bg-red-700"
                >
                  <X className="w-5 h-5" />
                  Decline
                </button>
              </div>
            )}
            {booking.status === "confirmed" && (
              <button
                onClick={handleComplete}
                className="flex gap-2 justify-center items-center py-3 font-medium text-white rounded-xl transition-colors bg-primary hover:bg-primary/90"
              >
                <Check className="w-5 h-5" />
                Complete Service
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <AnimatePresence>
        <ConfirmationModal
          isOpen={showAcceptModal}
          onClose={() => setShowAcceptModal(false)}
          onConfirm={handleAcceptConfirm}
          title="Accept Booking"
          description="Are you sure you want to accept this booking? The customer will be notified and your schedule will be updated."
          confirmText="Accept"
          confirmButtonClass="bg-[#4CAF50] hover:bg-[#43A047]"
          icon={Check}
        />
        <ConfirmationModal
          isOpen={showDeclineModal}
          onClose={() => setShowDeclineModal(false)}
          onConfirm={handleDeclineConfirm}
          title="Decline Booking"
          description="Are you sure you want to decline this booking? This action cannot be undone and the customer will be notified."
          confirmText="Decline"
          confirmButtonClass="bg-red-600 hover:bg-red-700"
          icon={X}
        />
      </AnimatePresence>
    </>
  );
};

export default ArtistBookingDetail;
