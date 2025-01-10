import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  X,
  Star,
  Clock,
  Brush,
  Scissors,
  Palette,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const services = [
  { name: "Makeup", icon: <Brush className="w-5 h-5" /> },
  { name: "Hair", icon: <Scissors className="w-5 h-5" /> },
  { name: "Nails", icon: <Palette className="w-5 h-5" /> },
  { name: "Facial", icon: <Sparkles className="w-5 h-5" /> },
];

const ArtistCard = ({ artist, navigate }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 transition-all border shadow-sm bg-white border-border/40 rounded-2xl hover:shadow-md"
    onClick={() => navigate(`/artist/${artist.id}`)}
  >
    <div className="flex gap-4">
      <div className="relative flex-shrink-0">
        <img
          src={artist.image}
          alt={artist.name}
          className="object-cover w-20 h-20 rounded-xl"
        />
        {artist.verified && (
          <div className="absolute p-0.5 rounded-full bg-primary -bottom-1 -right-1">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{artist.name}</h3>
            <p className="text-sm text-muted-foreground">{artist.specialty}</p>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="ml-1 text-sm font-medium">{artist.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 mr-1" />
            {artist.distance}
          </div>
          {artist.quickBook && (
            <div className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-accent/50 text-primary">
              <Clock className="w-3 h-3 mr-1" />
              Quick Book
            </div>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const ServiceModal = ({ isOpen, onClose, onSelect, activeServices }) => {
  const [selectedServices, setSelectedServices] = useState(
    activeServices || []
  );

  const handleSelect = (serviceName) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceName)) {
        return prev.filter((s) => s !== serviceName);
      }
      return [...prev, serviceName];
    });
  };

  const handleApply = () => {
    onSelect(selectedServices);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed inset-x-0 bottom-0 z-50 p-8 bg-background/95 backdrop-blur-sm border-t border-border/40 rounded-t-[32px] shadow-2xl"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-medium text-foreground mb-2">
          Select Services
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose the services you're looking for
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {services.map((service) => (
          <motion.button
            key={service.name}
            onClick={() => handleSelect(service.name)}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center gap-4 p-4 text-left transition-all rounded-2xl border ${
              selectedServices.includes(service.name)
                ? "bg-accent/80 border-primary shadow-lg text-foreground"
                : "bg-accent/20 border-border/40 text-muted-foreground hover:bg-accent/30"
            }`}
          >
            <div
              className={`p-3 rounded-xl ${
                selectedServices.includes(service.name)
                  ? "bg-background"
                  : "bg-background/70"
              }`}
            >
              <div
                className={
                  selectedServices.includes(service.name)
                    ? "text-foreground"
                    : "text-muted-foreground"
                }
              >
                {service.icon}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{service.name}</span>
              <span className="text-xs text-muted-foreground mt-1">
                {service.name === "Makeup" && "Bridal, Party & Natural"}
                {service.name === "Hair" && "Styling, Cut & Color"}
                {service.name === "Nails" && "Manicure & Art Design"}
                {service.name === "Facial" && "Cleansing & Treatment"}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        onClick={handleApply}
        className="w-full p-5 font-medium text-center transition-all rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl text-base"
      >
        Apply Filters
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onClose}
        className="w-full mt-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        Cancel
      </motion.button>
    </motion.div>
  );
};

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    topRated: false,
    quickBook: false,
    services: [],
  });
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get("filter");
    const service = params.get("service");

    if (filter) {
      setActiveFilters((prev) => ({
        ...prev,
        [filter]: true,
      }));
    }

    if (service) {
      setActiveFilters((prev) => ({
        ...prev,
        services: [service],
      }));
    }
  }, [location]);

  const toggleFilter = (filter) => {
    if (filter === "services") {
      setActiveFilters((prev) => ({
        ...prev,
        services: [],
      }));
    } else {
      setActiveFilters((prev) => ({
        ...prev,
        [filter]: !prev[filter],
      }));
    }
  };

  // Mock data for artists
  const artistsData = [
    {
      id: 1,
      name: "Sarah Mitchell",
      specialty: "Makeup Artist",
      rating: 4.9,
      reviewCount: 127,
      location: "Denpasar, Bali",
      distance: "2.3 km away",
      image: "https://i.pravatar.cc/300?img=1",
      verified: true,
      quickBook: true,
      services: ["Makeup", "Hair"],
    },
    {
      id: 2,
      name: "John Carter",
      specialty: "Hair Stylist",
      rating: 4.7,
      reviewCount: 89,
      location: "Kuta, Bali",
      distance: "3.1 km away",
      image: "https://i.pravatar.cc/300?img=2",
      verified: true,
      quickBook: false,
      services: ["Hair"],
    },
    {
      id: 3,
      name: "Emily Wang",
      specialty: "Nail Artist",
      rating: 4.8,
      reviewCount: 156,
      location: "Seminyak, Bali",
      distance: "1.8 km away",
      image: "https://i.pravatar.cc/300?img=3",
      verified: true,
      quickBook: true,
      services: ["Nails"],
    },
    {
      id: 4,
      name: "David Kim",
      specialty: "Facial Specialist",
      rating: 4.6,
      reviewCount: 92,
      location: "Canggu, Bali",
      distance: "4.2 km away",
      image: "https://i.pravatar.cc/300?img=4",
      verified: false,
      quickBook: true,
      services: ["Facial"],
    },
    {
      id: 5,
      name: "Lisa Chen",
      specialty: "Makeup & Hair",
      rating: 4.9,
      reviewCount: 143,
      location: "Kuta, Bali",
      distance: "2.8 km away",
      image: "https://i.pravatar.cc/300?img=5",
      verified: true,
      quickBook: true,
      services: ["Makeup", "Hair"],
    }
  ];

  // Filter artists based on search query and active filters
  const filteredArtists = artistsData.filter((artist) => {
    // Filter by search query
    if (
      searchQuery &&
      !artist.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !artist.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by quick book
    if (activeFilters.quickBook && !artist.quickBook) {
      return false;
    }

    // Filter by top rated
    if (activeFilters.topRated && artist.rating < 4.8) {
      return false;
    }

    // Filter by services
    if (
      activeFilters.services.length > 0 &&
      !artist.services.some((service) =>
        activeFilters.services.includes(service)
      )
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Search */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-4 p-6 border-b border-border/40">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div className="flex-1">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services or artists..."
                  className="w-full px-5 py-3 pr-12 bg-background border border-border/40 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                  autoFocus
                />
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute p-2 -translate-y-1/2 rounded-xl right-2 top-1/2 hover:bg-accent/50 transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </motion.button>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 border-b border-border/40 overflow-x-auto"
        >
          <div className="flex gap-3 px-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleFilter("quickBook")}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all rounded-xl shadow-sm ${
                activeFilters.quickBook
                  ? "bg-accent/90 text-foreground border border-border/40"
                  : "bg-accent/20 hover:bg-accent/30 text-muted-foreground border border-border/40"
              }`}
            >
              <Clock className={`w-4 h-4`} />
              Quick Book
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleFilter("topRated")}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all rounded-xl shadow-sm ${
                activeFilters.topRated
                  ? "bg-accent/90 text-foreground border border-border/40"
                  : "bg-accent/20 hover:bg-accent/30 text-muted-foreground border border-border/40"
              }`}
            >
              <Star className={`w-4 h-4`} />
              Top Rated
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsServiceModalOpen(true)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all rounded-xl shadow-sm ${
                activeFilters.services.length > 0
                  ? "bg-accent/90 text-foreground border border-border/40"
                  : "bg-accent/20 hover:bg-accent/30 text-muted-foreground border border-border/40"
              }`}
            >
              <Brush className={`w-4 h-4`} />
              Services
              <ChevronDown className={`w-4 h-4 ml-1`} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Recent Searches */}
      {!searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6"
        >
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">
            Recent Searches
          </h3>
          <div className="space-y-2">
            {["Bridal Makeup", "Hair Styling", "Nail Art"].map(
              (search, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSearchQuery(search)}
                  className="flex items-center w-full gap-4 p-4 transition-all border rounded-2xl hover:bg-accent/30 border-border/40 group"
                >
                  <div className="p-2 rounded-xl bg-accent/30 group-hover:bg-background/50 transition-colors">
                    <Search className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium">{search}</span>
                </motion.button>
              )
            )}
          </div>
        </motion.div>
      )}

      {/* Search Results */}
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6"
        >
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {filteredArtists.length} results for "{searchQuery}"
            {(activeFilters.topRated ||
              activeFilters.quickBook ||
              activeFilters.services.length > 0) && (
              <span className="block mt-1 text-xs">
                Filtered by:{" "}
                {[
                  activeFilters.topRated && "Top Rated",
                  activeFilters.quickBook && "Quick Book",
                  ...activeFilters.services,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            )}
          </p>
          <div className="space-y-4">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} navigate={navigate} />
            ))}
            {filteredArtists.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="w-12 h-12 mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">No results found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Service Selection Modal */}
      <AnimatePresence>
        {isServiceModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsServiceModalOpen(false)}
            />
            <ServiceModal
              isOpen={isServiceModalOpen}
              onClose={() => setIsServiceModalOpen(false)}
              onSelect={(services) =>
                setActiveFilters((prev) => ({ ...prev, services }))
              }
              activeServices={activeFilters.services}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchPage;
