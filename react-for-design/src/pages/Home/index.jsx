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
} from "lucide-react";

// Mock data
const popularServices = [
  {
    icon: <Brush className="h-6 w-6" />,
    name: "Makeup",
    description: "Professional makeup services",
    price: "From $79",
  },
  {
    icon: <Scissors className="h-6 w-6" />,
    name: "Hair",
    description: "Styling & treatments",
    price: "From $49",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    name: "Nails",
    description: "Manicure & pedicure",
    price: "From $39",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
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
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle location update
    localStorage.setItem("userLocation", location);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="relative w-full bg-background px-4 py-6 shadow-xl"
      >
        <div className="mx-auto max-w-lg">
          <h2 className="mb-6 text-xl font-semibold">
            Select delivery location
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search for area, street name..."
                className="w-full rounded-xl border-none bg-accent/50 py-4 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-6 py-4 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              Confirm Location
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
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
    <div className="min-h-screen bg-[#FDF8F5] pb-20">
      {/* Location Section */}
      <div className="relative bg-[#E8D3D1] px-4 pb-8 pt-6">
        {/* Location Selection */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex w-full flex-col items-start"
          >
            <span className="mb-1 text-xs font-medium uppercase tracking-wider text-[#9B6A6C]">
              DELIVER TO
            </span>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#9B6A6C]" />
              <span className="text-base font-medium text-[#4A3536] line-clamp-1">
                {userLocation}
              </span>
              <ChevronRight className="ml-auto h-5 w-5 text-[#9B6A6C]" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Search Bar - Positioned to overlap both sections */}
      <div className="relative px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative -mt-6 mb-6"
        >
          <div className="flex items-center rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/5">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services or artists..."
              className="ml-3 flex-1 bg-transparent outline-none placeholder:text-muted-foreground/70"
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
          className="mb-8 grid grid-cols-2 gap-4"
        >
          <button className="overflow-hidden rounded-3xl bg-[#D4AF37] p-6 text-left text-white shadow-lg">
            <Sparkles className="mb-3 h-7 w-7" />
            <h3 className="text-xl font-semibold">Quick Book</h3>
            <p className="text-sm text-white/90">Service in 60 mins</p>
          </button>
          <button className="overflow-hidden rounded-3xl bg-[#E8C5C5] p-6 text-left text-secondary-foreground shadow-lg">
            <Star className="mb-3 h-7 w-7" />
            <h3 className="text-xl font-semibold">Top Rated</h3>
            <p className="text-sm text-secondary-foreground/90">
              Best of the best
            </p>
          </button>
        </motion.div>

        {/* Popular Services */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Popular Services</h2>
            <button className="flex items-center text-sm text-primary">
              See all
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {popularServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-3 rounded-full bg-primary/10 p-2 w-fit">
                  {service.icon}
                </div>
                <h3 className="mb-1 font-semibold">{service.name}</h3>
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
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Featured Artists</h2>
            <button className="flex items-center text-sm text-primary">
              See all
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            {featuredArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md cursor-pointer"
                onClick={() => handleArtistClick(artist.id)}
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{artist.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="ml-1 text-sm font-medium">
                        {artist.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {artist.specialty}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {artist.reviews} reviews
                    </span>
                    {artist.available ? (
                      <span className="text-xs text-green-500">
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
