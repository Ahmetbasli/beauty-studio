import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Brush,
  Scissors,
  Palette,
  Sparkles,
} from "lucide-react";

// Mock data for top rated services
const topRatedServices = [
  {
    id: 1,
    name: "Premium Bridal Makeup",
    rating: 4.9,
    reviews: 234,
    price: "From $199",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=400&h=300&fit=crop",
    icon: <Brush className="w-6 h-6" />,
  },
  {
    id: 2,
    name: "Luxury Hair Treatment",
    rating: 4.8,
    reviews: 189,
    price: "From $149",
    image:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=400&h=300&fit=crop",
    icon: <Scissors className="w-6 h-6" />,
  },
  {
    id: 3,
    name: "Signature Nail Art",
    rating: 4.9,
    reviews: 156,
    price: "From $89",
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=400&h=300&fit=crop",
    icon: <Palette className="w-6 h-6" />,
  },
  {
    id: 4,
    name: "Advanced Facial Treatment",
    rating: 4.8,
    reviews: 167,
    price: "From $129",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400&h=300&fit=crop",
    icon: <Sparkles className="w-6 h-6" />,
  },
];

// Mock data for top rated artists
const topRatedArtists = [
  {
    id: 1,
    name: "Isabella Chen",
    specialty: "Celebrity Makeup Artist",
    rating: 4.9,
    reviews: 312,
    experience: "8 years",
    image: "https://i.pravatar.cc/150?img=5",
    distance: "2.3 km",
    available: true,
    badges: ["Celebrity Choice", "Award Winner"],
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    specialty: "Master Hair Stylist",
    rating: 4.9,
    reviews: 289,
    experience: "12 years",
    image: "https://i.pravatar.cc/150?img=6",
    distance: "3.1 km",
    available: true,
    badges: ["Master Stylist", "Educator"],
  },
  {
    id: 3,
    name: "Sophie Anderson",
    specialty: "Advanced Nail Artist",
    rating: 4.8,
    reviews: 245,
    experience: "6 years",
    image: "https://i.pravatar.cc/150?img=7",
    distance: "1.8 km",
    available: false,
    badges: ["Nail Art Expert"],
  },
];

const TopRated = () => {
  const navigate = useNavigate();

  const handleArtistClick = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border/40">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate("/home")}
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-medium">Top Rated</h1>
            <p className="text-sm text-muted-foreground">
              Best rated services & artists
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Location Info */}
        <div className="bg-primary/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-medium">Current Location</span>
            </div>
            <button className="text-sm text-primary">Change</button>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing top rated services and artists near you
          </p>
        </div>

        {/* Top Rated Services */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Premium Services</h2>
            <div className="flex items-center text-sm text-primary">
              <Star className="w-4 h-4 mr-1 fill-primary" />
              Highest Rated
            </div>
          </div>
          <div className="grid gap-4">
            {topRatedServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden border rounded-2xl border-border/40 hover:bg-accent/50 cursor-pointer"
              >
                <div className="relative h-40">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white">{service.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="ml-1 text-sm font-medium text-white">
                          {service.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="w-4 h-4 mr-1" />
                      {service.reviews} reviews
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {service.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Top Rated Artists */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Elite Artists</h2>
            <div className="flex items-center text-sm text-primary">
              <Star className="w-4 h-4 mr-1 fill-primary" />
              Most Experienced
            </div>
          </div>
          <div className="space-y-4">
            {topRatedArtists.map((artist) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-2xl cursor-pointer transition-all border-border/40 hover:bg-accent/50"
                onClick={() => handleArtistClick(artist.id)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{artist.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {artist.specialty}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {artist.badges.map((badge, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="ml-1 text-sm font-medium text-primary">
                          {artist.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {artist.experience} experience
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-muted-foreground">
                          {artist.distance}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TopRated;
