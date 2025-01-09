import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Sparkles,
  Brush,
  Scissors,
  Palette,
  Star,
  ChevronRight,
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

const HomePage = () => {
  const navigate = useNavigate();

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleArtistClick = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="relative bg-primary/5 px-4 pt-12 pb-24">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 text-3xl font-semibold"
          >
            Hey Nadya 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Book your beauty service for today
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="flex items-center rounded-2xl bg-background p-4 shadow-lg">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services or artists..."
              className="ml-3 flex-1 bg-transparent outline-none placeholder:text-muted-foreground/70"
            />
            <div className="h-6 w-[1px] bg-border"></div>
            <button className="ml-3 flex items-center text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span className="ml-2">Location</span>
            </button>
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
          className="-mt-12 mb-8 grid grid-cols-2 gap-4"
        >
          <button className="rounded-2xl bg-primary p-4 text-left text-primary-foreground shadow-lg">
            <Sparkles className="mb-2 h-6 w-6" />
            <h3 className="text-lg font-semibold">Quick Book</h3>
            <p className="text-sm text-primary-foreground/80">
              Service in 60 mins
            </p>
          </button>
          <button className="rounded-2xl bg-secondary p-4 text-left text-secondary-foreground shadow-lg">
            <Star className="mb-2 h-6 w-6" />
            <h3 className="text-lg font-semibold">Top Rated</h3>
            <p className="text-sm text-secondary-foreground/80">
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
    </div>
  );
};

export default HomePage;
