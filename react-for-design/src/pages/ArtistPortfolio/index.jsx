import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Image as ImageIcon } from "lucide-react";

// Mock data for the artist's portfolio
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

const ArtistPortfolio = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border/40">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate(`/artist/${id}`)}
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-medium">{artistPortfolio.name}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="ml-1 font-medium">{artistPortfolio.rating}</span>
              <span className="ml-1">({artistPortfolio.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2">
          {artistPortfolio.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => {
                // Navigate to the portfolio detail page
                navigate(`/artist/${id}/portfolio/${index}`);
              }}
            >
              <img
                src={image}
                alt={`Portfolio ${index + 1}`}
                className="object-cover w-full h-full transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 transition-opacity opacity-0 bg-black/40 group-hover:opacity-100" />
              <ImageIcon className="absolute w-6 h-6 transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 text-white/90 top-1/2 left-1/2 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPortfolio;
