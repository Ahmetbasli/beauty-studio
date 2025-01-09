import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Sparkles,
  Brush,
  Scissors,
  Palette,
  Star,
  ChevronRight,
  X,
  ArrowLeft,
  Target,
  Clock,
  MoreVertical,
  Map,
} from "lucide-react";

// Mock data
const popularServices = [
  {
    icon: <Brush className="w-6 h-6" />,
    name: "Makeup",
    description: "Professional makeup services",
    price: "From $79",
  },
  {
    icon: <Scissors className="w-6 h-6" />,
    name: "Hair",
    description: "Styling & treatments",
    price: "From $49",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    name: "Nails",
    description: "Manicure & pedicure",
    price: "From $39",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    name: "Facial",
    description: "Skincare treatments",
    price: "From $89",
  },
];

const featuredArtists = [
  {
    id: 1,
    name: "Sarah Mitchell",
    specialty: "Makeup Artist",
    rating: 4.9,
    reviews: 127,
    image: "https://i.pravatar.cc/150?img=1",
    available: true,
  },
  {
    id: 2,
    name: "Emma Davis",
    specialty: "Hair Stylist",
    rating: 4.8,
    reviews: 98,
    image: "https://i.pravatar.cc/150?img=2",
    available: true,
  },
  {
    id: 3,
    name: "Jessica Wang",
    specialty: "Nail Artist",
    rating: 4.9,
    reviews: 156,
    image: "https://i.pravatar.cc/150?img=3",
    available: false,
  },
];

const LocationModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [savedLocations, setSavedLocations] = useState([
    {
      id: 1,
      name: "Current location",
      address:
        "No.2 Jalan Jaya Giri XIV, Jl. Jaya Giri XIV No. 2, Dangin Puri Kelod, Denpasar Timur, Kota Denpasar",
      isCurrent: true,
    },
    {
      id: 2,
      name: "Home",
      address:
        "Jl. Poppies Lane 1, Gg. Sorga, Kuta, Kuta, Badung, Bali, Indonesia, 80361",
    },
    {
      id: 3,
      name: "Office",
      address:
        "Jl. Sedap Malam No. 10, Sanur Kaja, Denpasar Selatan, Kota Denpasar, Bali, Indonesia, 80227",
    },
  ]);

  const handleLocationSelect = (location) => {
    localStorage.setItem("userLocation", location.name);
    onClose();
  };

  const handleAddLocation = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newLocation = {
        id: savedLocations.length + 1,
        name: searchQuery,
        address: searchQuery, // In a real app, this would be properly formatted address
      };
      setSavedLocations([...savedLocations, newLocation]);
      setSearchQuery("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b bg-background border-border/40">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-accent">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-medium">Your Locations</h2>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent">
          <span className="text-xs font-medium">Bali</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 border-b border-border/40">
        <form onSubmit={handleAddLocation} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a new location..."
            className="w-full px-4 py-3 pr-12 bg-accent/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            className="absolute p-2 -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-accent"
          >
            <Search className="w-5 h-5 text-primary" />
          </button>
        </form>
      </div>

      {/* Saved Locations List */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">
          {savedLocations.map((location) => (
            <div
              key={location.id}
              onClick={() => handleLocationSelect(location)}
              className="flex items-start gap-4 p-4 cursor-pointer hover:bg-accent/50 rounded-2xl"
            >
              {location.isCurrent ? (
                <div className="p-2 rounded-full bg-accent">
                  <Target className="w-5 h-5 text-primary" />
                </div>
              ) : (
                <div className="p-2 rounded-full bg-accent">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="mb-1 font-medium text-foreground">
                  {location.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {location.address}
                </p>
              </div>
              <button className="p-2 rounded-full hover:bg-accent">
                <MoreVertical className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="p-4 border-t border-border/40">
        <button className="flex items-center justify-center w-full gap-2 p-4 font-medium border bg-background border-border/40 rounded-xl text-foreground hover:bg-accent/50">
          <Map className="w-5 h-5" />
          Choose from map
        </button>
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const userLocation =
    localStorage.getItem("userLocation") || "Select Location";

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleArtistClick = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Location Section */}
      <div className="relative px-4 pt-6 pb-6 bg-primary">
        {/* Location Selection */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex flex-col items-start w-full"
          >
            <span className="mb-1 text-xs font-medium tracking-wider uppercase text-primary-foreground/90">
              YOUR LOCATION
            </span>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-foreground" />
              <span className="text-base font-medium text-primary-foreground line-clamp-1">
                {userLocation}
              </span>
              <ChevronRight className="w-5 h-5 ml-auto text-primary-foreground/90" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="relative px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6 -mt-4"
        >
          <div className="flex items-center p-4 shadow-lg bg-background rounded-2xl ring-1 ring-border/40">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services or artists..."
              className="flex-1 ml-3 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="px-4">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <button
            onClick={() => navigate("/quick-book")}
            className="p-6 overflow-hidden text-left shadow-lg rounded-3xl bg-primary/5"
          >
            <Sparkles className="mb-3 h-7 w-7 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              Quick Book
            </h3>
            <p className="text-sm text-muted-foreground">Service in 60 mins</p>
          </button>
          <button
            onClick={() => navigate("/top-rated")}
            className="p-6 overflow-hidden text-left shadow-lg rounded-3xl bg-secondary/5"
          >
            <Star className="mb-3 h-7 w-7 text-secondary" />
            <h3 className="text-xl font-semibold text-foreground">Top Rated</h3>
            <p className="text-sm text-muted-foreground">Best of the best</p>
          </button>
        </motion.div>

        {/* Popular Services */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Popular Services
            </h2>
            <button className="flex items-center text-sm text-primary">
              See all
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {popularServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 transition-all border shadow-sm bg-background border-border/40 rounded-2xl hover:shadow-md"
              >
                <div className="p-2 mb-3 rounded-full bg-primary/5 w-fit">
                  <div className="text-primary">{service.icon}</div>
                </div>
                <h3 className="mb-1 font-semibold text-foreground">
                  {service.name}
                </h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <p className="text-sm font-medium text-primary">
                  {service.price}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Artists */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Featured Artists
            </h2>
            <button className="flex items-center text-sm text-primary">
              See all
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {featuredArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center p-4 transition-all border shadow-sm cursor-pointer bg-background border-border/40 rounded-2xl hover:shadow-md"
                onClick={() => handleArtistClick(artist.id)}
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="object-cover w-16 h-16 rounded-full"
                />
                <div className="flex-1 ml-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">
                      {artist.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="ml-1 text-sm font-medium text-primary">
                        {artist.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {artist.specialty}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {artist.reviews} reviews
                    </span>
                    {artist.available ? (
                      <span className="text-xs text-primary">
                        Available now
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Unavailable
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Location Modal */}
      <AnimatePresence>
        {isLocationModalOpen && (
          <LocationModal
            isOpen={isLocationModalOpen}
            onClose={() => setIsLocationModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
