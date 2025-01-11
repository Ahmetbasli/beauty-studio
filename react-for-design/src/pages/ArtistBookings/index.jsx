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
  Timer,
  TimerOff,
} from "lucide-react";

// Mock data for artist's bookings
const mockBookings = [
  {
    id: 1,
    customerName: "Emma Wilson",
    customerImage: "https://i.pravatar.cc/150?img=1",
    services: [
      {
        name: "Hair Coloring",
        duration: "120 min",
        price: "Rp 850.000",
      },
    ],
    date: "Today",
    time: "2:00 PM",
    location: "Your Studio",
    status: "pending",
    notes: "Allergic to certain hair dyes, please check before proceeding",
    bookedAt: "2024-02-20T10:30:00Z",
  },
  {
    id: 2,
    customerName: "Sophie Brown",
    customerImage: "https://i.pravatar.cc/150?img=2",
    services: [
      {
        name: "Makeup",
        duration: "60 min",
        price: "Rp 450.000",
      },
      {
        name: "Hair Styling",
        duration: "30 min",
        price: "Rp 200.000",
      },
    ],
    date: "Today",
    time: "4:30 PM",
    location: "Your Studio",
    status: "confirmed",
    notes: "Natural look preferred, bringing reference photos",
    bookedAt: "2024-02-19T15:45:00Z",
  },
  {
    id: 3,
    customerName: "Alice Johnson",
    customerImage: "https://i.pravatar.cc/150?img=3",
    services: [
      {
        name: "Hair Styling",
        duration: "45 min",
        price: "Rp 300.000",
      },
      {
        name: "Hair Treatment",
        duration: "30 min",
        price: "Rp 250.000",
      },
    ],
    date: "Today",
    time: "11:00 AM",
    location: "Your Studio",
    status: "in_progress",
    notes: "Wedding guest hairstyle",
    bookedAt: "2024-02-19T09:15:00Z",
    startedAt: "2024-02-19T11:00:00Z",
  },
  {
    id: 4,
    customerName: "Linda Chen",
    customerImage: "https://i.pravatar.cc/150?img=4",
    services: [
      {
        name: "Facial Treatment",
        duration: "90 min",
        price: "Rp 750.000",
      },
    ],
    date: "Tomorrow",
    time: "3:00 PM",
    location: "Your Studio",
    status: "cancelled",
    notes: "Deep cleansing facial",
    bookedAt: "2024-02-19T14:20:00Z",
    cancelledAt: "2024-02-19T15:20:00Z",
    cancellationReason: "Customer requested cancellation",
  },
  {
    id: 5,
    customerName: "Rachel Kim",
    customerImage: "https://i.pravatar.cc/150?img=5",
    services: [
      {
        name: "Nail Art",
        duration: "60 min",
        price: "Rp 350.000",
      },
      {
        name: "Hand Spa",
        duration: "30 min",
        price: "Rp 200.000",
      },
    ],
    date: "Today",
    time: "1:30 PM",
    location: "Your Studio",
    status: "completed",
    notes: "Geometric patterns preferred",
    bookedAt: "2024-02-19T10:00:00Z",
    completedAt: "2024-02-19T15:00:00Z",
  },
];

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "in_progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "in_progress":
        return "In Progress";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium border rounded-full ${getStatusStyles()}`}
    >
      {getStatusLabel()}
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

  const getFinishTime = (startTime, services) => {
    const durationMinutes = services.reduce((total, service) => {
      return total + parseInt(service.duration);
    }, 0);

    const [hours, minutes] = startTime.split(":").map((num) => parseInt(num));
    const isPM = startTime.includes("PM");

    let totalHours = hours + (isPM && hours !== 12 ? 12 : 0);
    let endMinutes = minutes + durationMinutes;

    totalHours = totalHours + Math.floor(endMinutes / 60);
    endMinutes = endMinutes % 60;

    let finishHours = totalHours % 24;
    const newIsPM = finishHours >= 12;
    finishHours = finishHours > 12 ? finishHours - 12 : finishHours;
    finishHours = finishHours === 0 ? 12 : finishHours;

    return `${finishHours}:${endMinutes.toString().padStart(2, "0")} ${
      newIsPM ? "PM" : "AM"
    }`;
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
              <p className="text-sm text-muted-foreground">
                {booking.services.length}{" "}
                {booking.services.length === 1 ? "service" : "services"}
              </p>
            </div>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2 items-center text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{booking.date}</span>
            </div>
            <div className="space-y-1">
              <div className="flex gap-2 justify-end items-center text-sm">
                <Timer className="w-4 h-4 text-primary" />
                <span>{booking.time}</span>
              </div>
              <div className="flex gap-2 justify-end items-center text-sm">
                <TimerOff className="w-4 h-4 text-primary" />
                <span>
                  {getFinishTime(
                    booking.time.replace(/\s/g, ""),
                    booking.services
                  )}
                </span>
              </div>
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
          <span className="font-medium">
            {booking.services
              .reduce((total, service) => {
                const price = parseInt(service.price.replace(/[^0-9]/g, ""));
                return total + price;
              }, 0)
              .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
              .replace("IDR", "Rp")}
          </span>
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

      <ConfirmationModal
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        onConfirm={handleAcceptConfirm}
        title="Accept Booking"
        description="Are you sure you want to accept this booking? The customer will be notified."
        confirmText="Accept"
        confirmButtonClass="bg-[#4CAF50] hover:bg-[#4CAF50]/90"
        icon={Check}
      />

      <ConfirmationModal
        isOpen={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        onConfirm={handleDeclineConfirm}
        title="Decline Booking"
        description="Are you sure you want to decline this booking? This action cannot be undone and the customer will be refunded."
        confirmText="Decline"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        icon={X}
      />
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
      <div className="sticky top-0 z-10 bg-white border-b border-border/40">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold">Bookings</h1>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => navigate("/artist/availability")}
              className="p-2 rounded-full transition-colors hover:bg-accent/50"
            >
              <Clock className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/artist/bookings/history")}
              className="p-2 rounded-full transition-colors hover:bg-accent/50"
            >
              <History className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
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

        {/* Bookings List */}
        <div className="space-y-4">
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
