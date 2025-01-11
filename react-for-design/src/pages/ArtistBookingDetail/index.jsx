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
  Timer,
  TimerOff,
} from "lucide-react";

// Using the same mock data from ArtistBookings
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

  const getTotalDuration = (services) => {
    const totalMinutes = services.reduce((total, service) => {
      return total + parseInt(service.duration);
    }, 0);
    return `${totalMinutes} min`;
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

  const getTotalPrice = (services) => {
    return services
      .reduce((total, service) => {
        const price = parseInt(service.price.replace(/[^0-9]/g, ""));
        return total + price;
      }, 0)
      .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
      .replace("IDR", "Rp");
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
              <p className="text-sm text-muted-foreground">
                {booking.services.length}{" "}
                {booking.services.length === 1 ? "service" : "services"}
              </p>
            </div>
          </div>

          {/* Service Details */}
          <div className="p-4 mb-6 rounded-xl border border-border/40">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium">Services</h3>
                <p className="text-sm text-muted-foreground">
                  Total Duration: {getTotalDuration(booking.services)}
                </p>
              </div>
              <span className="text-lg font-medium">
                {getTotalPrice(booking.services)}
              </span>
            </div>
            <div className="space-y-3 pt-3 border-t border-border/40">
              {booking.services.map((service, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.duration}
                    </p>
                  </div>
                  <span className="text-muted-foreground">{service.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Details */}
          <div className="p-4 mb-6 space-y-4 rounded-xl border border-border/40">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-2 items-center text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{booking.date}</span>
              </div>
              <div className="space-y-1">
                <div className="flex gap-2 items-center text-sm justify-end">
                  <Timer className="w-4 h-4 text-primary" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex gap-2 items-center text-sm justify-end">
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
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Location
              </h3>
              <div className="flex gap-2 items-center">
                <MapPin className="w-4 h-4 text-primary" />
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
              </div>
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="p-4 mb-6 space-y-2 rounded-xl border border-border/40">
              <h3 className="font-medium">Notes</h3>
              <p className="text-sm text-muted-foreground">{booking.notes}</p>
            </div>
          )}

          {/* Status Info */}
          <div className="p-4 mb-6 space-y-2 text-sm rounded-xl border border-border/40 bg-accent/50">
            <p className="text-muted-foreground">
              Booked on {new Date(booking.bookedAt).toLocaleDateString()} at{" "}
              {new Date(booking.bookedAt).toLocaleTimeString()}
            </p>
            {booking.status === "completed" && (
              <p className="text-muted-foreground">
                Completed on{" "}
                {new Date(booking.completedAt).toLocaleDateString()} at{" "}
                {new Date(booking.completedAt).toLocaleTimeString()}
              </p>
            )}
            {booking.status === "cancelled" && (
              <>
                <p className="text-muted-foreground">
                  Cancelled on{" "}
                  {new Date(booking.cancelledAt).toLocaleDateString()} at{" "}
                  {new Date(booking.cancelledAt).toLocaleTimeString()}
                </p>
                {booking.cancellationReason && (
                  <p className="text-muted-foreground">
                    Reason: {booking.cancellationReason}
                  </p>
                )}
              </>
            )}
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
              <div className="grid gap-3">
                <button
                  onClick={handleComplete}
                  className="flex gap-2 justify-center items-center py-3 font-medium text-white rounded-xl transition-colors bg-primary hover:bg-primary/90"
                >
                  <Check className="w-5 h-5" />
                  Complete Service
                </button>
                <button
                  onClick={() => navigate(`/artist/bookings/${id}/cancel`)}
                  className="flex gap-2 justify-center items-center py-3 font-medium text-red-600 rounded-xl border border-red-200 transition-colors hover:bg-red-50"
                >
                  <X className="w-5 h-5" />
                  Cancel Booking
                </button>
              </div>
            )}
            {booking.status === "in_progress" && (
              <div className="grid gap-3">
                <button
                  onClick={handleComplete}
                  className="flex gap-2 justify-center items-center py-3 font-medium text-white rounded-xl transition-colors bg-primary hover:bg-primary/90"
                >
                  <Check className="w-5 h-5" />
                  Complete Service
                </button>
                <button
                  onClick={() => navigate(`/artist/bookings/${id}/cancel`)}
                  className="flex gap-2 justify-center items-center py-3 font-medium text-red-600 rounded-xl border border-red-200 transition-colors hover:bg-red-50"
                >
                  <X className="w-5 h-5" />
                  Cancel Service
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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

export default ArtistBookingDetail;
