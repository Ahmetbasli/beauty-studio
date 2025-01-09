import React from "react";
import { motion } from "framer-motion";
import { Star, Clock, MapPin, Award, Shield, Calendar } from "lucide-react";

// Mock data for the artist
const artistData = {
  name: "Sarah Mitchell",
  rating: 4.9,
  reviews: 127,
  specialty: "Makeup Artist & Hair Stylist",
  experience: "8+ years",
  location: "San Francisco Bay Area",
  price: "$79/hour",
  image: "https://i.pravatar.cc/400?img=1",
  description:
    "Certified makeup artist specializing in bridal, editorial, and natural makeup. Expert in all skin types and tones. Creating personalized looks that enhance your natural beauty.",
  services: [
    {
      name: "Bridal Makeup",
      duration: "120 min",
      price: "$150",
    },
    {
      name: "Evening Makeup",
      duration: "60 min",
      price: "$79",
    },
    {
      name: "Hair Styling",
      duration: "45 min",
      price: "$65",
    },
  ],
  availability: ["Mon-Fri: 9am-7pm", "Sat: 8am-8pm", "Sun: 10am-6pm"],
  certificates: [
    "Professional Makeup Artist Certificate",
    "Hair Styling License",
  ],
};

const ArtistDetailPage = () => {
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
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 left-4 tap-target rounded-full bg-background/80 p-2 backdrop-blur-sm"
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>
      </div>

      {/* Content Section */}
      <div className="relative -mt-20 px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="rounded-3xl bg-card p-6 shadow-lg"
        >
          {/* Artist Info */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="mb-1 text-2xl font-semibold">{artistData.name}</h1>
              <p className="text-muted-foreground">{artistData.specialty}</p>
              <div className="mt-2 flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{artistData.rating}</span>
                <span className="text-muted-foreground">
                  ({artistData.reviews} reviews)
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-primary/10 px-4 py-2 text-center">
              <p className="text-sm font-medium text-primary">from</p>
              <p className="text-lg font-semibold text-primary">
                {artistData.price}
              </p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Experience</p>
                <p className="text-sm text-muted-foreground">
                  {artistData.experience}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {artistData.location}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">About</h2>
            <p className="text-muted-foreground">{artistData.description}</p>
          </div>

          {/* Services */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold">Services</h2>
            <div className="space-y-3">
              {artistData.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.duration}
                    </p>
                  </div>
                  <p className="font-semibold text-primary">{service.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold">Availability</h2>
            <div className="flex flex-wrap gap-2">
              {artistData.availability.map((time, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-secondary/10 px-3 py-1.5 text-sm text-secondary-foreground"
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">Certificates</h2>
            <div className="space-y-2">
              {artistData.certificates.map((certificate, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Award className="h-4 w-4 text-primary" />
                  <span>{certificate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Book Now Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="tap-target w-full rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
          >
            Book Appointment
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtistDetailPage;
