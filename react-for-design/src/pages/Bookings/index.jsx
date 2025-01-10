import React, { useState } from "react";
import { Clock, MapPin, ChevronRight } from "lucide-react";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("active");

  // Mock data for bookings
  const activeBookings = [
    {
      id: 1,
      serviceName: "Bridal Makeup",
      artistName: "Sarah Mitchell",
      date: "Tomorrow",
      time: "10:00 AM",
      location: "Denpasar, Bali",
      price: "$199",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      serviceName: "Hair Styling",
      artistName: "Emma Wilson",
      date: "Next Monday",
      time: "2:30 PM",
      location: "Kuta, Bali",
      price: "$89",
      image: "https://i.pravatar.cc/150?img=2",
    },
  ];

  const bookingHistory = [
    {
      id: 3,
      serviceName: "Natural Makeup",
      artistName: "Sarah Mitchell",
      date: "Yesterday",
      time: "11:30 AM",
      location: "Denpasar, Bali",
      price: "$69",
      image: "https://i.pravatar.cc/150?img=1",
      status: "Completed",
    },
    {
      id: 4,
      serviceName: "Party Makeup",
      artistName: "Emma Wilson",
      date: "Last Week",
      time: "4:00 PM",
      location: "Kuta, Bali",
      price: "$89",
      image: "https://i.pravatar.cc/150?img=2",
      status: "Cancelled",
    },
  ];

  const renderBookingCard = (booking, isHistory = false) => (
    <div
      key={booking.id}
      className="p-4 mb-4 border rounded-2xl border-border/40"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 overflow-hidden rounded-full">
          <img
            src={booking.image}
            alt={booking.artistName}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{booking.serviceName}</h3>
          <p className="text-sm text-muted-foreground">
            with {booking.artistName}
          </p>
        </div>
        {isHistory && (
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              booking.status === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {booking.status}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between py-3 border-t border-border/40">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-1" />
          {booking.date} at {booking.time}
        </div>
        <span className="font-medium text-primary">{booking.price}</span>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border/40">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          {booking.location}
        </div>
        {!isHistory && (
          <button className="flex items-center text-sm font-medium text-primary">
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 bg-background">
      {/* Header */}
      <h1 className="mb-6 text-2xl font-semibold">Bookings</h1>

      {/* Tabs */}
      <div className="flex p-1 mb-6 border rounded-xl border-border/40">
        <button
          onClick={() => setActiveTab("active")}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg ${
            activeTab === "active"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg ${
            activeTab === "history"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground"
          }`}
        >
          History
        </button>
      </div>

      {/* Booking Lists */}
      <div>
        {activeTab === "active" ? (
          activeBookings.length > 0 ? (
            activeBookings.map((booking) => renderBookingCard(booking))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center border rounded-2xl border-border/40">
              <p className="mb-2 text-lg font-medium">No Active Bookings</p>
              <p className="text-sm text-muted-foreground">
                You don't have any upcoming appointments
              </p>
            </div>
          )
        ) : bookingHistory.length > 0 ? (
          bookingHistory.map((booking) => renderBookingCard(booking, true))
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center border rounded-2xl border-border/40">
            <p className="mb-2 text-lg font-medium">No Booking History</p>
            <p className="text-sm text-muted-foreground">
              Your past appointments will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
