import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EditBio = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "Sophie Brown",
    specialization: "Makeup Artist & Hair Stylist",
    experience: "5",
    location: "Jakarta, Indonesia",
    workingHours: "09:00 - 18:00",
    bio: "Professional makeup artist with 5 years of experience specializing in bridal, special occasion, and natural everyday makeup. Known for creating flawless, long-lasting looks tailored to each client's unique features and preferences.",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the updated bio to your backend
    console.log("Saving bio:", formData);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border/40">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-accent/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">Edit Bio</h1>
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-1.5 text-sm font-medium text-white rounded-full bg-primary hover:bg-primary/90 transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Full Name</label>
            <input
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Specialization
            </label>
            <input
              value={formData.specialization}
              onChange={(e) =>
                setFormData({ ...formData, specialization: e.target.value })
              }
              placeholder="e.g., Makeup Artist & Hair Stylist"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Years of Experience
            </label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              min="0"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Location</label>
            <input
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="e.g., Jakarta, Indonesia"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Working Hours
            </label>
            <input
              value={formData.workingHours}
              onChange={(e) =>
                setFormData({ ...formData, workingHours: e.target.value })
              }
              placeholder="e.g., 09:00 - 18:00"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Professional Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={6}
              placeholder="Tell clients about your experience, expertise, and what makes your services unique..."
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Write a brief description of your professional background,
              specialties, and approach to beauty services.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBio;
