import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  MapPin,
  Heart,
  Clock,
  ChevronRight,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  Star,
  Shield,
} from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Profile</h1>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="flex items-center gap-4 p-4 border rounded-xl bg-background border-border/40">
          <div className="relative">
            <div className="w-16 h-16 overflow-hidden rounded-full bg-accent/50">
              <img
                src="https://i.pravatar.cc/150?img=36"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-white">
              <User className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium">Sarah Mitchell</h2>
            <p className="text-sm text-muted-foreground">+1 (555) 000-0000</p>
          </div>
        </div>
      </div>

      {/* Test Content */}
      <div className="p-4">
        <button
          onClick={() => navigate("/home")}
          className="w-full p-4 text-center border rounded-xl hover:bg-accent/50"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
