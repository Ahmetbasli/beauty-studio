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
  Filter,
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

const BookingDetailsModal = ({
  booking,
  isOpen,
  onClose,
  onAccept,
  onDecline,
  onComplete,
  onMessage,
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
        className="w-full max-w-md p-6 mx-4 overflow-auto bg-background rounded-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Booking Details</h2>
          <StatusBadge status={booking.status} />
        </div>

        {/* Customer Info */}
        <div className="p-4 mb-6 border rounded-xl border-border/40">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={booking.customerImage}
              alt={booking.customerName}
              className="object-cover w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-medium">{booking.customerName}</h3>
              <div className="flex flex-col gap-1 mt-1">
                <a
                  href={`tel:${booking.customerPhone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Phone className="w-4 h-4" />
                  {booking.customerPhone}
                </a>
                <a
                  href={`mailto:${booking.customerEmail}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Mail className="w-4 h-4" />
                  {booking.customerEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="p-4 mb-6 space-y-4 border rounded-xl border-border/40">
          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Service
            </h3>
            <p className="font-medium">{booking.service}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Date
              </h3>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{booking.date}</span>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Time
              </h3>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{booking.time}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Duration
            </h3>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{booking.duration}</span>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Location
            </h3>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{booking.location}</span>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Price
            </h3>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="font-medium">{booking.price}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="p-4 mb-6 space-y-2 border rounded-xl border-border/40">
            <h3 className="font-medium">Customer Notes</h3>
            <p className="text-sm text-muted-foreground">{booking.notes}</p>
          </div>
        )}

        {/* Booking Time */}
        <div className="p-4 mb-6 space-y-2 text-sm border rounded-xl border-border/40 bg-accent/50">
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
                onClick={() => {
                  onAccept(booking.id);
                  onClose();
                }}
                className="flex items-center justify-center gap-2 py-3 font-medium text-white transition-colors rounded-xl bg-emerald-600 hover:bg-emerald-700"
              >
                <Check className="w-5 h-5" />
                Accept
              </button>
              <button
                onClick={() => {
                  onDecline(booking.id);
                  onClose();
                }}
                className="flex items-center justify-center gap-2 py-3 font-medium text-white transition-colors bg-red-600 rounded-xl hover:bg-red-700"
              >
                <X className="w-5 h-5" />
                Decline
              </button>
            </div>
          )}
          {booking.status === "confirmed" && (
            <button
              onClick={() => {
                onComplete(booking.id);
                onClose();
              }}
              className="flex items-center justify-center gap-2 py-3 font-medium text-white transition-colors rounded-xl bg-primary hover:bg-primary/90"
            >
              <Check className="w-5 h-5" />
              Complete Service
            </button>
          )}
          <button
            onClick={() => {
              onMessage(booking.id);
              onClose();
            }}
            className="flex items-center justify-center w-full gap-2 py-3 font-medium transition-colors border rounded-xl hover:bg-accent"
          >
            <MessageCircle className="w-5 h-5" />
            Message Customer
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BookingCard = ({
  booking,
  onAccept,
  onDecline,
  onComplete,
  onMessage,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="p-4 space-y-4 transition-colors border cursor-pointer rounded-xl border-border/40 hover:bg-accent/50"
        onClick={() => setShowDetails(true)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span>{booking.time}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{booking.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <span className="font-medium">{booking.price}</span>
          <div className="flex gap-2">
            {booking.status === "pending" && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAccept(booking.id);
                  }}
                  className="p-2 text-emerald-600 transition-colors rounded-lg hover:bg-emerald-50"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDecline(booking.id);
                  }}
                  className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-50"
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
                className="px-3 py-1 text-sm font-medium text-white transition-colors rounded-lg bg-primary hover:bg-primary/90"
              >
                Complete
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMessage(booking.id);
              }}
              className="p-2 transition-colors rounded-lg hover:bg-accent"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        <BookingDetailsModal
          booking={booking}
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          onAccept={onAccept}
          onDecline={onDecline}
          onComplete={onComplete}
          onMessage={onMessage}
        />
      </AnimatePresence>
    </>
  );
};

const ArtistBookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [filterOpen, setFilterOpen] = useState(false);
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

  const handleMessage = (bookingId) => {
    navigate(`/chat/${bookingId}`);
  };

  const filteredBookings = mockBookings.filter((booking) => {
    // Status filter
    if (activeTab === "upcoming") {
      if (!["pending", "confirmed"].includes(booking.status)) {
        return false;
      }
    } else {
      if (!["completed", "cancelled"].includes(booking.status)) {
        return false;
      }
    }

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
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-xl border-border/40">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Bookings</h1>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="p-2 transition-colors rounded-lg hover:bg-accent"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search by customer or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 transition-colors border rounded-lg border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <User className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
          </div>

          {/* Date Filter */}
          <div className="grid grid-cols-4 gap-2 mb-4">
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

          {/* Tabs */}
          <div className="grid grid-cols-2 p-1 border rounded-xl border-border/40">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "upcoming"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "history"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              History
            </button>
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
                onMessage={handleMessage}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center border rounded-xl border-border/40">
              <p className="mb-2 text-lg font-medium">No Bookings</p>
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "No bookings match your search"
                  : activeTab === "upcoming"
                  ? "You don't have any upcoming appointments"
                  : "Your past appointments will appear here"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistBookings;
