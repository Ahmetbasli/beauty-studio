import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Star,
  MessageCircle,
  AlertCircle,
} from "lucide-react";

// Mock data for a booking
const mockBooking = {
  id: "1",
  artistId: "1",
  artistName: "Sarah Mitchell",
  service: "Hair Coloring",
  date: "Aug 15, 2024",
  time: "10:00 AM",
  location: "Sarah Mitchell's Studio, Denpasar",
  status: "pending",
  price: "Rp 850.000",
  duration: "120 min",
  image:
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  rating: 4.9,
  reviews: 127,
  notes:
    "Please arrive 5 minutes before the appointment. Bring reference photos if you have any specific style in mind.",
  cancellationPolicy:
    "Free cancellation up to 24 hours before the appointment. After that, a cancellation fee may apply.",
};

const CountdownTimer = ({ createdAt }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Mock created time (15 minutes from now for demo)
    const mockCreatedTime = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
    const endTime = new Date(mockCreatedTime.getTime() + 15 * 60 * 1000); // 15 minutes deadline

    const timer = setInterval(() => {
      const now = new Date();
      const difference = endTime - now;

      if (difference <= 0) {
        setTimeLeft("Time's up!");
        clearInterval(timer);
        return;
      }

      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [createdAt]);

  return timeLeft;
};

const StatusBadge = ({ status }) => {
  const statusStyles = {
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      dot: "bg-amber-500",
    },
    confirmed: {
      bg: "bg-green-50",
      text: "text-green-700",
      dot: "bg-green-500",
    },
    completed: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      dot: "bg-blue-500",
    },
    cancelled: {
      bg: "bg-red-50",
      text: "text-red-700",
      dot: "bg-red-500",
    },
  };

  const style = statusStyles[status];
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div
      className={`px-3 py-1 text-sm font-medium rounded-lg ${style.bg} ${style.text}`}
    >
      <div className="flex items-center gap-1.5">
        <div
          className={`w-1.5 h-1.5 rounded-full ${style.dot} ${
            status === "pending" ? "animate-pulse" : ""
          }`}
        />
        {status === "pending" ? (
          <div className="flex items-center gap-1">
            <span>Pending</span>
            <span className="text-xs">
              (<CountdownTimer />)
            </span>
          </div>
        ) : (
          label
        )}
      </div>
    </div>
  );
};

const BookingDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-xl border-border/40">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate("/bookings")}
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-medium">Booking Details</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1">
        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Artist Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={mockBooking.image}
                alt={mockBooking.artistName}
                className="object-cover w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="font-medium">{mockBooking.artistName}</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="w-4 h-4 mr-1 fill-primary text-primary" />
                  <span className="font-medium">{mockBooking.rating}</span>
                  <span className="ml-1">({mockBooking.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <StatusBadge status={mockBooking.status} />
          </div>

          {/* Auto-cancel Warning for Pending Status */}
          {mockBooking.status === "pending" && (
            <div className="flex items-start gap-3 p-4 text-sm border rounded-xl border-amber-200 bg-amber-50 text-amber-700">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Waiting for Artist Confirmation</p>
                <p className="mt-1">
                  The booking will be automatically cancelled and refunded if
                  the artist doesn't respond within 15 minutes.
                </p>
              </div>
            </div>
          )}

          {/* Service Details */}
          <div className="p-4 space-y-4 border rounded-xl border-border/40">
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Service
              </h3>
              <p className="font-medium">{mockBooking.service}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Date
                </h3>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{mockBooking.date}</span>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Time
                </h3>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{mockBooking.time}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Location
              </h3>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{mockBooking.location}</span>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Price
              </h3>
              <p className="font-medium">{mockBooking.price}</p>
            </div>
          </div>

          {/* Notes */}
          <div className="p-4 space-y-2 border rounded-xl border-border/40">
            <h3 className="font-medium">Notes</h3>
            <p className="text-sm text-muted-foreground">{mockBooking.notes}</p>
          </div>

          {/* Cancellation Policy */}
          <div className="p-4 space-y-2 border rounded-xl border-border/40">
            <h3 className="font-medium">Cancellation Policy</h3>
            <p className="text-sm text-muted-foreground">
              {mockBooking.cancellationPolicy}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid gap-3">
            <button
              onClick={() => navigate(`/chat/${mockBooking.artistId}`)}
              className="flex items-center justify-center w-full gap-2 py-3 font-medium text-white transition-colors rounded-xl bg-primary hover:bg-primary/90"
            >
              <MessageCircle className="w-5 h-5" />
              Message Artist
            </button>
            {mockBooking.status === "pending" && (
              <button
                onClick={() => {
                  /* Handle cancellation */
                }}
                className="w-full py-3 font-medium text-red-600 transition-colors rounded-xl hover:bg-red-50"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
