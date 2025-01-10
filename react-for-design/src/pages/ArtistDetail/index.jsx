import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  generateAvailableTimeSlots,
  mockWorkingHours,
  mockExistingBookings,
} from "../../utils/scheduleUtils";

// Mock artist data
const artistData = {
  id: 1,
  name: "Sarah Mitchell",
  specialty: "Makeup Artist",
  rating: 4.9,
  reviews: 127,
  experience: "5+ years",
  description:
    "Professional makeup artist specializing in bridal and special occasion makeup. Known for creating flawless, long-lasting looks tailored to each client's unique style.",
  image: "https://i.pravatar.cc/400?img=1",
  location: "Denpasar, Bali",
  distance: "2.3 km away",
  badges: ["Celebrity Choice", "Award Winner"],
  services: [
    {
      id: 1,
      name: "Bridal Makeup",
      duration: "120 min",
      price: "$199",
    },
    {
      id: 2,
      name: "Party Makeup",
      duration: "60 min",
      price: "$89",
    },
    {
      id: 3,
      name: "Natural Makeup",
      duration: "45 min",
      price: "$69",
    },
  ],
};

const ArtistDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate available time slots based on selected date and service
  const availableTimeSlots = useMemo(() => {
    if (!selectedService) return [];

    const dayOfWeek = selectedDate.getDay().toString();
    const workingHours = mockWorkingHours[dayOfWeek];

    return generateAvailableTimeSlots(
      selectedDate,
      workingHours,
      parseInt(selectedService.duration),
      mockExistingBookings
    );
  }, [selectedDate, selectedService]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedTimeSlot(null);
  };

  const handleTimeSelect = (slot) => {
    if (slot.status === "available") {
      setSelectedTimeSlot(slot);
      setShowConfirmation(true);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Generate next 7 days
  const nextDays = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${artistData.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95" />
        <button
          onClick={() => navigate(-1)}
          className="absolute p-2 rounded-full top-4 left-4 bg-background/80 backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content Section */}
      <div className="relative px-4 -mt-20">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-semibold text-foreground">
            {artistData.name}
          </h1>
          <div className="flex items-center gap-2 mb-3 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{artistData.location}</span>
            <span className="text-sm">•</span>
            <span className="text-sm">{artistData.distance}</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="ml-1 font-medium">{artistData.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({artistData.reviews} reviews)
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {artistData.badges.map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Services */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Services</h2>
            <div className="text-sm text-muted-foreground">
              Select a service to view availability
            </div>
          </div>
          <div className="grid gap-3">
            {artistData.services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className={`p-4 border rounded-2xl cursor-pointer transition-all ${
                  selectedService?.id === service.id
                    ? "border-primary bg-primary/5"
                    : "border-border/40 hover:bg-accent/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{service.name}</h3>
                  <span className="font-medium text-primary">
                    {service.price}
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {service.duration}
                </div>
              </div>
            ))}
          </div>
        </section>

        {selectedService && (
          <>
            {/* Calendar */}
            <section className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Select Date</h2>
                <div className="text-sm text-primary">
                  {formatDate(selectedDate)}
                </div>
              </div>
              <div className="flex gap-2 pb-2 mb-4 overflow-x-auto scrollbar-hide">
                {nextDays.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    className={`flex-shrink-0 p-3 rounded-xl border transition-all ${
                      selectedDate.getDate() === date.getDate()
                        ? "border-primary bg-primary/5"
                        : "border-border/40"
                    }`}
                  >
                    <div className="text-sm font-medium">
                      {isToday(date) ? "Today" : formatDate(date)}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Time Slots */}
            <section className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Available Times</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedService.duration} per session
                </div>
              </div>
              {availableTimeSlots.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleTimeSelect(slot)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                        selectedTimeSlot?.id === slot.id
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border/40 hover:bg-accent/50"
                      }`}
                    >
                      {formatTime(slot.startTime)}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 border border-border/40 rounded-2xl">
                  <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-center text-muted-foreground">
                    No available slots for this date.
                    <br />
                    Please try another day.
                  </p>
                </div>
              )}
            </section>

            {/* Working Hours Info */}
            <section className="mb-6">
              <div className="p-4 rounded-2xl bg-accent/50">
                <h3 className="mb-2 font-medium">Working Hours</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p>Monday - Friday</p>
                    <p className="font-medium text-foreground">
                      9:00 AM - 7:00 PM
                    </p>
                  </div>
                  <div>
                    <p>Saturday - Sunday</p>
                    <p className="font-medium text-foreground">
                      10:00 AM - 6:00 PM
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p>Break Time</p>
                    <p className="font-medium text-foreground">
                      1:00 PM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* About */}
        <section className="mb-6">
          <h2 className="mb-4 text-lg font-medium">About</h2>
          <p className="text-muted-foreground">{artistData.description}</p>
        </section>
      </div>

      {/* Booking Button */}
      {selectedService && selectedTimeSlot && (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-background border-border/40">
          <button
            onClick={() => setShowConfirmation(true)}
            className="w-full py-4 font-medium bg-primary text-primary-foreground rounded-xl"
          >
            Book for {formatTime(selectedTimeSlot.startTime)}
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm p-6 mx-4 bg-background rounded-3xl"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10">
                <Check className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-xl font-semibold">Confirm Booking</h2>
              <p className="text-muted-foreground">
                {selectedService.name} with {artistData.name}
              </p>
              <p className="mt-1 font-medium text-foreground">
                {formatDate(selectedDate)} at{" "}
                {formatTime(selectedTimeSlot.startTime)}
              </p>
              <div className="p-3 mt-4 rounded-xl bg-accent/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">
                    {selectedService.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium text-primary">
                    {selectedService.price}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/home")}
                className="w-full py-3 font-medium bg-primary text-primary-foreground rounded-xl"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full py-3 font-medium bg-accent text-foreground rounded-xl"
              >
                Change Time
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ArtistDetail;
