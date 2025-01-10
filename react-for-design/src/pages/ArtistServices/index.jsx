import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Star, Filter, Search } from "lucide-react";

// Mock data for the artist's services
const artistServices = {
  name: "Sarah Mitchell",
  rating: 4.9,
  reviews: 127,
  services: [
    {
      id: 1,
      name: "Bridal Makeup",
      duration: "120 min",
      price: "$199",
      rating: 4.9,
      reviews: 48,
      image:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Natural Makeup",
      duration: "60 min",
      price: "$89",
      rating: 4.8,
      reviews: 36,
      image:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Party Makeup",
      duration: "90 min",
      price: "$129",
      rating: 4.7,
      reviews: 29,
      image:
        "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Editorial Makeup",
      duration: "150 min",
      price: "$249",
      rating: 5.0,
      reviews: 12,
      image:
        "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Basic Makeup",
      duration: "45 min",
      price: "$69",
      rating: 4.6,
      reviews: 52,
      image:
        "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=800&auto=format&fit=crop",
    },
  ],
};

const ArtistServices = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = artistServices.services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border/40">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-medium">{artistServices.name}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="ml-1 font-medium">{artistServices.rating}</span>
              <span className="ml-1">({artistServices.reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 text-muted-foreground left-3 top-3" />
              <input
                type="text"
                placeholder="Search services"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-xl border-border/40 bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button className="p-2 border rounded-xl border-border/40 hover:bg-accent/50">
              <Filter className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="p-4 space-y-4">
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 p-4 transition-all border shadow-sm bg-white border-border/40 rounded-2xl hover:shadow-md group"
          >
            <div
              className="flex flex-1 gap-4 cursor-pointer"
              onClick={() => navigate(`/services/${service.id}`)}
            >
              <img
                src={service.image}
                alt={service.name}
                className="object-cover w-20 h-20 rounded-xl"
              />
              <div className="flex-1">
                <h3 className="font-medium">{service.name}</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {service.duration}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-sm font-medium text-primary">
                    {service.price}
                  </p>
                  <span className="text-sm text-muted-foreground">•</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="ml-1 text-xs font-medium">
                      {service.rating}
                    </span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({service.reviews})
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle booking
                  navigate(`/artist/${id}/book/${service.id}`);
                }}
                className="px-4 py-2 text-sm font-medium text-white transition-all rounded-lg bg-primary hover:bg-primary/90"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArtistServices;
