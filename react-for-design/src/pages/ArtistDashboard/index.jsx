import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Bell,
  CheckCircle2,
  User,
  Power,
  ChevronRight,
} from "lucide-react";

// Mock data for the dashboard
const mockData = {
  todayAppointments: [
    {
      id: 1,
      customerName: "Emma Thompson",
      service: "Bridal Makeup",
      time: "10:00 AM",
      location: "Customer's Location",
      price: "Rp 750.000",
      status: "confirmed",
    },
    {
      id: 2,
      customerName: "Sophie Chen",
      service: "Natural Makeup",
      time: "2:30 PM",
      location: "Your Studio",
      price: "Rp 450.000",
      status: "pending",
    },
  ],
  stats: {
    todayEarnings: "Rp 1.200.000",
    totalBookings: 5,
    completedToday: 2,
    upcomingToday: 3,
  },
  notifications: [
    {
      id: 1,
      type: "new_booking",
      message: "New booking request from Linda Wang",
      time: "5 minutes ago",
      isRead: false,
    },
    {
      id: 2,
      type: "reminder",
      message: "Upcoming appointment in 30 minutes",
      time: "25 minutes ago",
      isRead: true,
    },
  ],
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

const ArtistDashboard = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border/40">
        <div className="flex justify-between items-center p-4">
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, Sarah!
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <button className="relative p-2 rounded-full transition-colors hover:bg-accent/50">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Online/Offline Toggle */}
        <div className="p-4 bg-white rounded-2xl">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div
                className={`p-2 rounded-xl ${
                  isOnline ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <Power
                  className={`w-5 h-5 ${
                    isOnline ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </div>
              <div>
                <h2 className="font-medium">Availability Status</h2>
                <p className="text-sm text-muted-foreground">
                  {isOnline ? "You're visible to customers" : "You're offline"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`relative w-12 h-6 transition-colors rounded-full ${
                isOnline ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute w-5 h-5 transition-transform transform bg-white rounded-full top-0.5 left-0.5 ${
                  isOnline ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white rounded-2xl transition-colors cursor-pointer hover:bg-accent/50"
            onClick={() => navigate("/artist/earnings")}
          >
            <div className="p-2 rounded-xl w-fit bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Today's Earnings
            </p>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold">
                {mockData.stats.todayEarnings}
              </p>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-white rounded-2xl transition-colors cursor-pointer hover:bg-accent/50"
            onClick={() => navigate("/artist/availability")}
          >
            <div className="p-2 rounded-xl w-fit bg-primary/10">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Set Availability
            </p>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold">
                {mockData.stats.totalBookings} slots
              </p>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-white rounded-2xl"
          >
            <div className="p-2 rounded-xl w-fit bg-primary/10">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-semibold">
              {mockData.stats.totalBookings}
            </p>
          </motion.div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-2xl">
          <div className="flex justify-between items-center p-4 border-b border-border/40">
            <h2 className="font-medium">Today's Appointments</h2>
            <button
              onClick={() => navigate("/artist/appointments")}
              className="flex items-center text-sm text-primary"
            >
              View all
              <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-border/40">
            {mockData.todayAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 transition-colors cursor-pointer hover:bg-accent/50"
                onClick={() => navigate(`/artist/bookings/${appointment.id}`)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{appointment.customerName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {appointment.service}
                    </p>
                  </div>
                  <StatusBadge status={appointment.status} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 w-4 h-4" />
                    {appointment.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 w-4 h-4" />
                    {appointment.location}
                  </div>
                  <div className="flex items-center text-sm font-medium text-primary">
                    <DollarSign className="mr-2 w-4 h-4" />
                    {appointment.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl">
          <div className="flex justify-between items-center p-4 border-b border-border/40">
            <h2 className="font-medium">Notifications</h2>
            <button className="text-sm text-primary">Mark all as read</button>
          </div>
          <div className="divide-y divide-border/40">
            {mockData.notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 ${!notification.isRead ? "bg-primary/5" : ""}`}
              >
                <div className="flex gap-3 items-start">
                  <div
                    className={`p-2 rounded-xl ${
                      !notification.isRead ? "bg-primary/10" : "bg-accent"
                    }`}
                  >
                    <Bell
                      className={`w-4 h-4 ${
                        !notification.isRead
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
