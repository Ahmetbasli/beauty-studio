import React, { useState, useEffect } from "react";
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
} from "lucide-react";

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

// Mock schedule data
const generateTimeSlots = () => {
  const today = new Date();
  const slots = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const daySlots = [];
    // Generate slots from 9 AM to 7 PM
    for (let hour = 9; hour <= 19; hour++) {
      const isBooked = Math.random() < 0.3; // 30% chance of being booked
      daySlots.push({
        time: `${hour}:00`,
        available: !isBooked,
      });
      if (hour !== 19) {
        daySlots.push({
          time: `${hour}:30`,
          available: !isBooked,
        });
      }
    }
    slots.push({
      date,
      slots: daySlots,
    });
  }
  return slots;
};

const ArtistDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [schedule] = useState(generateTimeSlots());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleTimeSelect = (slot) => {
    if (slot.available && selectedService) {
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

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${artistData.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content Section */}
      <div className="relative -mt-20 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {artistData.name}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
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
          <h2 className="text-lg font-medium mb-4">Services</h2>
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
                  <span className="text-primary font-medium">{service.price}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {service.duration}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Calendar */}
        <section className="mb-6">
          <h2 className="text-lg font-medium mb-4">Select Date</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {schedule.map(({ date }, index) => (
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
        {selectedService && (
          <section className="mb-6">
            <h2 className="text-lg font-medium mb-4">Available Times</h2>
            <div className="grid grid-cols-3 gap-2">
              {schedule
                .find(
                  (s) => s.date.getDate() === selectedDate.getDate()
                )
                ?.slots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSelect(slot)}
                    disabled={!slot.available}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedTimeSlot?.time === slot.time
                        ? "border-primary bg-primary/5 text-primary"
                        : slot.available
                        ? "border-border/40 hover:bg-accent/50"
                        : "border-border/40 bg-accent/50 text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
            </div>
          </section>
        )}

        {/* About */}
        <section className="mb-6">
          <h2 className="text-lg font-medium mb-4">About</h2>
          <p className="text-muted-foreground">{artistData.description}</p>
        </section>
      </div>

      {/* Booking Button */}
      {selectedService && selectedTimeSlot && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border/40">
          <button
            onClick={() => setShowConfirmation(true)}
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-medium"
          >
            Book for {selectedTimeSlot.time}
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm mx-4 p-6 bg-background rounded-3xl"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10">
                <Check className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">Confirm Booking</h2>
              <p className="text-muted-foreground">
                {selectedService.name} with {artistData.name}
              </p>
              <p className="font-medium text-foreground mt-1">
                {formatDate(selectedDate)} at {selectedTimeSlot.time}
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/home")}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full py-3 bg-accent text-foreground rounded-xl font-medium"
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
