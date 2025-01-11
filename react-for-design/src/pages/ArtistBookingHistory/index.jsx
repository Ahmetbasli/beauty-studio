import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  ArrowLeft,
  User,
} from "lucide-react";

// Using the same mock data structure from ArtistBookings
const mockBookings = [
  {
    id: 4,
    customerName: "Linda Chen",
    customerImage: "https://i.pravatar.cc/150?img=4",
    customerPhone: "+1 234-567-8903",
    customerEmail: "linda.chen@example.com",
    service: "Hair Styling",
    date: "Yesterday",
    time: "3:00 PM",
    duration: "60 min",
    location: "Your Studio",
    status: "completed",
    price: "Rp 450.000",
    notes: "Regular customer - prefers natural styling",
    bookedAt: "2024-02-18T09:15:00Z",
  },
  {
    id: 5,
    customerName: "Sarah Williams",
    customerImage: "https://i.pravatar.cc/150?img=5",
    customerPhone: "+1 234-567-8904",
    customerEmail: "sarah.williams@example.com",
    service: "Makeup",
    date: "Last Week",
    time: "11:00 AM",
    duration: "90 min",
    location: "Customer Location",
    status: "cancelled",
    price: "Rp 650.000",
    notes: "Cancelled due to emergency",
    bookedAt: "2024-02-17T14:30:00Z",
  },
];

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
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

const BookingCard = ({ booking, onMessage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-4 space-y-4 rounded-xl border transition-colors border-border/40"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img
            src={booking.customerImage}
            alt={booking.customerName}
            className="w-12 h-12 rounded-full object-cover"
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
          <span>{booking.location}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-border/40">
        <span className="font-medium">{booking.price}</span>
        <button
          onClick={() => onMessage(booking.id)}
          className="p-2 rounded-lg transition-colors hover:bg-accent"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

const ArtistBookingHistory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleMessage = (bookingId) => {
    navigate(`/chat/${bookingId}`);
  };

  const filteredBookings = mockBookings.filter((booking) => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        booking.customerName.toLowerCase().includes(searchLower) ||
        booking.service.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b backdrop-blur-xl bg-background/80 border-border/40">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3 items-center">
              <button
                onClick={() => navigate("/artist/bookings")}
                className="p-2 rounded-lg transition-colors hover:bg-accent"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-semibold">Booking History</h1>
            </div>
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
                onMessage={handleMessage}
              />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center p-8 text-center rounded-xl border border-border/40">
              <p className="mb-2 text-lg font-medium">No Past Bookings</p>
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "No bookings match your search"
                  : "Your booking history will appear here"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistBookingHistory;
