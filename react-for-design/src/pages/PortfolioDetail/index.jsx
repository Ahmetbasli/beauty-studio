import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, Download, Share2 } from "lucide-react";

// Mock data for the portfolio images (this should be replaced with real data)
const artistPortfolio = {
  name: "Sarah Mitchell",
  rating: 4.9,
  reviews: 127,
  images: [
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522337094846-8a818192de1f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526307616774-60d0098f7642?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1457972851104-4fd469440bf9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470259078422-826894b933aa?q=80&w=800&auto=format&fit=crop",
  ],
};

const PortfolioDetail = () => {
  const navigate = useNavigate();
  const { id, imageIndex } = useParams();
  const [currentIndex, setCurrentIndex] = useState(parseInt(imageIndex) || 0);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex]); // Add currentIndex as dependency

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      // Update URL without navigating
      window.history.replaceState(
        null,
        "",
        `/artist/${id}/portfolio/${currentIndex - 1}`
      );
    }
  };

  const handleNext = () => {
    if (currentIndex < artistPortfolio.images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      // Update URL without navigating
      window.history.replaceState(
        null,
        "",
        `/artist/${id}/portfolio/${currentIndex + 1}`
      );
    }
  };

  const handleClose = () => {
    navigate(`/artist/${id}/portfolio`);
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Navigation */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={handlePrevious}
          className={`p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentIndex === 0}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className={`p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors ${
            currentIndex === artistPortfolio.images.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={currentIndex === artistPortfolio.images.length - 1}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center w-full h-full p-4"
        >
          <img
            src={artistPortfolio.images[currentIndex]}
            alt={`Portfolio ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-2xl"
          />
        </motion.div>
      </AnimatePresence>

      {/* Image Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm text-sm">
          {currentIndex + 1} / {artistPortfolio.images.length}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;
