import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Camera,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "Nadya putri",
    email: "nadya.nadya@gmail.com",
    phone: "+628532178439",
    birthDate: "1990-01-01",
    location: "Istanbul, Turkey",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    navigate(-1);
  };

  const InputField = ({ icon: Icon, label, name, type = "text", ...props }) => (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-muted-foreground"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute -translate-y-1/2 left-3 top-1/2 text-muted-foreground">
          <Icon className="w-5 h-5" />
        </div>
        <input
          type={type}
          id={name}
          name={name}
          className="w-full py-2 pl-10 pr-4 transition-colors border-2 bg-background rounded-xl border-border/40 focus:border-primary/30 focus:outline-none"
          {...props}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-background border-border/40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-1 transition-colors rounded-full hover:bg-accent"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Edit Profile</h1>
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-1.5 text-sm font-medium text-white rounded-full bg-primary hover:bg-primary/90 transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 overflow-hidden rounded-full bg-primary/10">
              <img
                src="https://i.pravatar.cc/150?img=36"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 p-2 text-white transition-colors rounded-full shadow-lg bg-primary hover:bg-primary/90"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <button
            type="button"
            className="text-sm font-medium transition-colors text-primary hover:text-primary/90"
          >
            Change Profile Photo
          </button>
        </div>

        {/* Form Fields */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <InputField
            disabled
            icon={User}
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />

          <InputField
            icon={Mail}
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <InputField
            icon={Phone}
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />

          <InputField
            icon={Calendar}
            label="Birth Date"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </motion.div>
      </form>
    </div>
  );
};

export default EditProfilePage;
