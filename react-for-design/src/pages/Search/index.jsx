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
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const services = [
  { name: "Makeup", icon: <Brush className="w-5 h-5" /> },
  { name: "Hair", icon: <Scissors className="w-5 h-5" /> },
  { name: "Nails", icon: <Palette className="w-5 h-5" /> },
  { name: "Facial", icon: <Sparkles className="w-5 h-5" /> },
];

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
      className="fixed inset-x-0 bottom-0 z-50 p-4 bg-background border-t border-border/40"
    >
      <div className="mb-4">
        <h3 className="text-lg font-medium">Select Services</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {services.map((service) => (
          <button
            key={service.name}
            onClick={() => handleSelect(service.name)}
            className={`flex items-center gap-3 p-4 text-left transition-colors rounded-xl ${
              selectedServices.includes(service.name)
                ? "bg-accent/90 text-foreground"
                : "bg-accent/30 hover:bg-accent/50 text-muted-foreground"
            }`}
          >
            <div className="p-2 rounded-full bg-background/50">
              {service.icon}
            </div>
            <span className="font-medium">{service.name}</span>
          </button>
        ))}
      </div>
      <button
        onClick={handleApply}
        className="w-full p-4 font-medium text-center transition-colors rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Apply
      </button>
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

  // Handle URL parameters on mount
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Search */}
      <div className="sticky top-0 z-10 bg-background">
        <div className="flex items-center gap-3 p-4 border-b border-border/40">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services or artists..."
                className="w-full px-4 py-3 pr-12 bg-accent/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute p-2 -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-accent"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="p-4 border-b border-border/40">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => toggleFilter("quickBook")}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                activeFilters.quickBook
                  ? "bg-accent/90 text-foreground"
                  : "bg-accent/30 hover:bg-accent/50 text-muted-foreground"
              }`}
            >
              <Clock
                className={`w-4 h-4 ${
                  activeFilters.quickBook ? "text-foreground" : ""
                }`}
              />
              Quick Book
            </button>
            <button
              onClick={() => toggleFilter("topRated")}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                activeFilters.topRated
                  ? "bg-accent/90 text-foreground"
                  : "bg-accent/30 hover:bg-accent/50 text-muted-foreground"
              }`}
            >
              <Star
                className={`w-4 h-4 ${
                  activeFilters.topRated ? "text-foreground" : ""
                }`}
              />
              Top Rated
            </button>
            <button
              onClick={() => setIsServiceModalOpen(true)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                activeFilters.services.length > 0
                  ? "bg-accent/90 text-foreground"
                  : "bg-accent/30 hover:bg-accent/50 text-muted-foreground"
              }`}
            >
              <Brush
                className={`w-4 h-4 ${
                  activeFilters.services.length > 0 ? "text-foreground" : ""
                }`}
              />
              Services
              <ChevronDown
                className={`w-4 h-4 ml-1 ${
                  activeFilters.services.length > 0 ? "text-foreground" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Searches */}
      {!searchQuery && (
        <div className="p-4">
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">
            Recent Searches
          </h3>
          <div className="space-y-4">
            {["Bridal Makeup", "Hair Styling", "Nail Art"].map(
              (search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="flex items-center w-full gap-3 p-3 transition-colors rounded-xl hover:bg-accent/50"
                >
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">{search}</span>
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && (
        <div className="p-4">
          <p className="mb-4 text-sm text-muted-foreground">
            Showing results for "{searchQuery}"
            {(activeFilters.topRated ||
              activeFilters.quickBook ||
              activeFilters.services) && (
              <span>
                {" "}
                • Filtered by:{" "}
                {[
                  activeFilters.topRated && "Top Rated",
                  activeFilters.quickBook && "Quick Book",
                  activeFilters.services && activeFilters.services,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            )}
          </p>
          {/* Add search results here */}
        </div>
      )}

      {/* Service Selection Modal */}
      <AnimatePresence>
        {isServiceModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
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
