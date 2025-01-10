import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";

const mockBookings = [
  {
    id: 1,
    artistId: "1",
    artistName: "Sarah Mitchell",
    service: "Hair Coloring",
    date: "Aug 15, 2024",
    time: "10:00 AM",
    location: "Sarah Mitchell's Studio, Denpasar",
    status: "pending",
    price: "Rp 850.000",
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    artistId: "2",
    artistName: "Emma Davis",
    service: "Makeup",
    date: "Aug 18, 2024",
    time: "2:00 PM",
    location: "Emma's Beauty Studio, Kuta",
    status: "confirmed",
    price: "Rp 650.000",
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    artistId: "3",
    artistName: "Jessica Lee",
    service: "Nail Art",
    date: "Aug 20, 2024",
    time: "11:30 AM",
    location: "Nail Paradise, Seminyak",
    status: "completed",
    price: "Rp 450.000",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 4,
    artistId: "4",
    artistName: "Linda Wang",
    service: "Facial Treatment",
    date: "Aug 5, 2024",
    time: "3:00 PM",
    location: "Beauty Spa, Kuta",
    status: "cancelled",
    price: "Rp 750.000",
    image:
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 5,
    artistId: "2",
    artistName: "Emma Davis",
    service: "Hair Styling",
    date: "Aug 1, 2024",
    time: "11:00 AM",
    location: "Emma's Beauty Studio, Kuta",
    status: "completed",
    price: "Rp 450.000",
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
];

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
      className={`px-3 py-1 text-xs font-medium rounded-lg ${style.bg} ${style.text}`}
    >
      <div className="flex items-center gap-1.5">
        <div
          className={`w-1.5 h-1.5 rounded-full ${style.dot} ${
            status === "pending" ? "animate-pulse" : ""
          }`}
        />
        {label}
      </div>
    </div>
  );
};

const BookingCard = ({ booking, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="p-4 space-y-4 transition-colors border rounded-xl border-border/40 hover:bg-accent/50"
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={booking.image}
          alt={booking.artistName}
          className="object-cover w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-medium">{booking.artistName}</h3>
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
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </div>
  </motion.div>
);

const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center border rounded-xl border-border/40">
    <p className="mb-2 text-lg font-medium">No Bookings</p>
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

const BookingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");

  const filteredBookings = mockBookings.filter((booking) => {
    if (activeTab === "active") {
      return ["pending", "confirmed"].includes(booking.status);
    } else {
      return ["completed", "cancelled"].includes(booking.status);
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-xl border-border/40">
        <div className="p-4">
          <h1 className="mb-4 text-2xl font-semibold">My Bookings</h1>

          {/* Tabs */}
          <div className="grid grid-cols-2 p-1 border rounded-xl border-border/40">
            <button
              onClick={() => setActiveTab("active")}
              className={`py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "active"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Active
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
      <div className="flex-1 ">
        {/* Bookings List */}
        <div className="p-4 space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onClick={() => navigate(`/booking/${booking.id}`)}
              />
            ))
          ) : (
            <EmptyState
              message={
                activeTab === "active"
                  ? "You don't have any upcoming appointments"
                  : "Your past appointments will appear here"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
