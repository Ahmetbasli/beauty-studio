import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Check,
  X,
  MessageCircle,
  History,
  Phone,
  Mail,
  ChevronDown,
  AlertCircle,
  User,
  DollarSign,
} from "lucide-react";

// Mock data for artist's bookings
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
  {
    id: 3,
    customerName: "Alice Johnson",
    customerImage: "https://i.pravatar.cc/150?img=3",
    customerPhone: "+1 234-567-8902",
    customerEmail: "alice.johnson@example.com",
    service: "Hair Styling",
    date: "Tomorrow",
    time: "11:00 AM",
    duration: "60 min",
    location: "Your Studio",
    status: "confirmed",
    price: "Rp 450.000",
    notes: "Wedding guest hairstyle",
    bookedAt: "2024-02-19T09:15:00Z",
  },
];

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
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
      className="flex fixed inset-0 z-50 justify-center items-center bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="p-6 mx-4 w-full max-w-sm rounded-2xl bg-background"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#D4B48D]">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">{title}</h3>
          <p className="mb-6 text-base text-[#6B7280]">{description}</p>
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={onClose}
              className="py-3 font-medium rounded-xl border hover:bg-accent"
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

const BookingCard = ({ booking, onAccept, onDecline, onComplete }) => {
  const navigate = useNavigate();
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  const handleAcceptConfirm = () => {
    setShowAcceptModal(false);
    onAccept(booking.id);
  };

  const handleDeclineConfirm = () => {
    setShowDeclineModal(false);
    onDecline(booking.id);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="p-4 space-y-4 rounded-xl border transition-colors cursor-pointer border-border/40 hover:bg-accent/50"
        onClick={() => navigate(`/artist/bookings/${booking.id}`)}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <img
              src={booking.customerImage}
              alt={booking.customerName}
              className="object-cover w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-medium">{booking.customerName}</h3>
              <p className="text-sm text-muted-foreground">{booking.service}</p>
            </div>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{booking.date}</span>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span>{booking.time}</span>
            </div>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <button
              onClick={(e) => {
                e.stopPropagation();
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
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-border/40">
          <span className="font-medium">{booking.price}</span>
          <div className="flex gap-2">
            {booking.status === "pending" && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAcceptModal(true);
                  }}
                  className="p-2 text-emerald-600 rounded-lg transition-colors hover:bg-emerald-50"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeclineModal(true);
                  }}
                  className="p-2 text-red-600 rounded-lg transition-colors hover:bg-red-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            )}
            {booking.status === "confirmed" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onComplete(booking.id);
                }}
                className="px-3 py-1 text-sm font-medium text-white rounded-lg transition-colors bg-primary hover:bg-primary/90"
              >
                Complete
              </button>
            )}
          </div>
        </div>
      </motion.div>

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

const ArtistBookings = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all"); // all, today, tomorrow, week

  const handleAccept = (bookingId) => {
    console.log("Accepted booking:", bookingId);
    // Handle booking acceptance
  };

  const handleDecline = (bookingId) => {
    console.log("Declined booking:", bookingId);
    // Handle booking decline
  };

  const handleComplete = (bookingId) => {
    console.log("Completed booking:", bookingId);
    // Handle booking completion
  };

  const filteredBookings = mockBookings.filter((booking) => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        booking.customerName.toLowerCase().includes(searchLower) ||
        booking.service.toLowerCase().includes(searchLower)
      );
    }

    // Date filter
    if (dateFilter !== "all") {
      switch (dateFilter) {
        case "today":
          return booking.date === "Today";
        case "tomorrow":
          return booking.date === "Tomorrow";
        case "week":
          // In a real app, you would check if the date is within the next 7 days
          return true;
        default:
          return true;
      }
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b backdrop-blur-xl bg-background/80 border-border/40">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Bookings</h1>
            <button
              onClick={() => navigate("/artist/bookings/history")}
              className="p-2 rounded-lg transition-colors hover:bg-accent"
            >
              <History className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search by customer or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 pl-10 w-full rounded-lg border transition-colors border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <User className="absolute left-3 top-1/2 w-5 h-5 transform -translate-y-1/2 text-muted-foreground" />
          </div>

          {/* Date Filter */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: "all", label: "All" },
              { value: "today", label: "Today" },
              { value: "tomorrow", label: "Tomorrow" },
              { value: "week", label: "This Week" },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setDateFilter(filter.value)}
                className={`py-1.5 px-3 text-sm font-medium rounded-lg transition-colors ${
                  dateFilter === filter.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1">
        {/* Bookings List */}
        <div className="p-4 space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onAccept={handleAccept}
                onDecline={handleDecline}
                onComplete={handleComplete}
              />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center p-8 text-center rounded-xl border border-border/40">
              <p className="mb-2 text-lg font-medium">No Bookings</p>
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "No bookings match your search"
                  : "You don't have any bookings yet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistBookings;
