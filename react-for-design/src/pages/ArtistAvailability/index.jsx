import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Check, X } from "lucide-react";
import { motion } from "framer-motion";

const ArtistAvailability = () => {
  const navigate = useNavigate();

  // Generate next 7 days
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Time slots from 6 AM to 8 PM with 30-minute intervals
  const timeSlots = Array.from({ length: 29 }, (_, i) => {
    const hour = Math.floor(i / 2) + 6;
    const minutes = i % 2 === 0 ? "00" : "30";
    const formattedHour = hour.toString().padStart(2, "0");
    return `${formattedHour}:${minutes}`;
  });

  // Initialize selected slots with 8:00-17:00 available for each day
  const [selectedSlots, setSelectedSlots] = useState(() => {
    const initialSlots = {};
    next7Days.forEach((date) => {
      timeSlots.forEach((time) => {
        const [hour] = time.split(":");
        if (parseInt(hour) >= 8 && parseInt(hour) < 17) {
          const key = `${date.toDateString()}-${time}`;
          initialSlots[key] = true;
        }
      });
    });
    return initialSlots;
  });

  const formatDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
    };
  };

  const handleSlotClick = (date, time) => {
    const key = `${date.toDateString()}-${time}`;
    setSelectedSlots((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    // Here you would save the selected slots
    console.log("Selected slots:", selectedSlots);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border/40">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-accent/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">Set Availability</h1>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 text-sm font-medium text-white rounded-full bg-primary hover:bg-primary/90 transition-colors"
          >
            Save
          </button>
        </div>
        {/* Legend */}
        <div className="flex gap-4 items-center px-4 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-white border border-border/40"></div>
            <span className="text-sm text-muted-foreground">Blocked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary/20 border-2 border-primary"></div>
            <span className="text-sm text-muted-foreground">Available</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Days header */}
            <div className="grid grid-cols-8 gap-2 mb-4">
              <div className="flex items-center justify-center">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              {next7Days.map((date) => {
                const { day, date: dateNum } = formatDate(date);
                return (
                  <div
                    key={date.toDateString()}
                    className="flex flex-col items-center justify-center p-2 text-sm font-medium bg-white rounded-xl shadow-sm"
                  >
                    <span className="text-muted-foreground">{day}</span>
                    <span>{dateNum}</span>
                  </div>
                );
              })}
            </div>

            {/* Time slots */}
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-8 gap-2 mb-2">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  {time}
                </div>
                {next7Days.map((date) => {
                  const key = `${date.toDateString()}-${time}`;
                  const isSelected = selectedSlots[key];
                  return (
                    <motion.button
                      key={key}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSlotClick(date, time)}
                      className={`h-8 rounded-lg transition-colors flex items-center justify-center ${
                        isSelected
                          ? "bg-primary/20 border-2 border-primary hover:bg-primary/30"
                          : "bg-white border border-border/40 hover:bg-accent/50"
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground opacity-50" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistAvailability;
