import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Star,
  ChevronRight,
  Info,
  CheckCircle,
  Users,
  Timer,
  Sparkles,
} from "lucide-react";

// Mock data for the service
const serviceData = {
  id: 1,
  artistId: 1, // Added artistId for navigation
  artist: {
    id: 1,
    name: "Sarah Mitchell",
    specialty: "Makeup Artist",
    rating: 4.9,
    reviewCount: 127,
    location: "Denpasar, Bali",
    distance: "2.3 km away",
    image: "https://i.pravatar.cc/300?img=2",
    verified: true,
    description:
      "Professional makeup artist with 8+ years of experience specializing in bridal, editorial, and natural makeup looks. Featured in Vogue and Elle magazines.",
    services: [
      {
        id: 1,
        name: "Bridal Makeup",
        duration: "120 min",
        price: "$199",
        image:
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Natural Makeup",
        duration: "60 min",
        price: "$89",
        image:
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: 3,
        name: "Party Makeup",
        duration: "90 min",
        price: "$129",
        image:
          "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  name: "Bridal Makeup",
  duration: "120 min",
  price: "$199",
  rating: 4.9,
  reviews: 127,
  image:
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop",
  description:
    "Transform into a radiant bride with our premium bridal makeup service. Using high-end products and expert techniques to ensure your makeup lasts all day and looks stunning in photos.",
  benefits: [
    "Long-lasting makeup that stays perfect for 12+ hours",
    "Premium products suitable for all skin types",
    "Professional lighting setup for perfect application",
    "Includes false lashes and touch-up kit",
  ],
  whatToExpect: [
    "Initial consultation to discuss your desired look",
    "Skin prep and primer application",
    "Full face makeup application",
    "Setting spray for long-lasting wear",
  ],
  additionalInfo: [
    "Trial session recommended (booked separately)",
    "Early morning appointments available",
    "Travel to venue available on request",
    "Bring reference photos if desired",
  ],
  popularWith: [
    "Brides for their special day",
    "Bridal party members",
    "Special occasion celebrations",
    "Professional photoshoots",
  ],
};

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBooking = () => {
    navigate(`/artist/${serviceData.artistId}/booking`, {
      state: {
        selectedService: serviceData,
        artistData: serviceData.artist,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[300px]">
        <img
          src={serviceData.image}
          alt={serviceData.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate(-1)}
          className="absolute p-2 rounded-full top-4 left-4 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="px-4 -mt-16 relative">
        <div className="p-6 bg-background border border-border/40 rounded-2xl shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold">{serviceData.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {serviceData.duration}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="ml-1 text-sm font-medium">
                    {serviceData.rating}
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    ({serviceData.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
            <span className="text-xl font-semibold text-primary">
              {serviceData.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6">
            {serviceData.description}
          </p>

          {/* Book Now Button */}
          <button
            onClick={handleBooking}
            className="w-full py-3 mb-6 font-medium text-white transition-colors rounded-xl bg-primary hover:bg-primary/90"
          >
            Book Now
          </button>

          {/* Benefits */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">Benefits</h2>
              </div>
              <div className="grid gap-2">
                {serviceData.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 mt-0.5 text-primary" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Expect */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Timer className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">What to Expect</h2>
              </div>
              <div className="grid gap-2">
                {serviceData.whatToExpect.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 mt-0.5 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">Additional Information</h2>
              </div>
              <div className="grid gap-2">
                {serviceData.additionalInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 mt-0.5 text-primary" />
                    <span>{info}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular With */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium">Popular With</h2>
              </div>
              <div className="grid gap-2">
                {serviceData.popularWith.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 mt-0.5 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
