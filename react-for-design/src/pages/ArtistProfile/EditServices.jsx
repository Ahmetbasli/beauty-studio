import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  GripVertical,
  Clock,
  DollarSign,
  Image as ImageIcon,
  X,
  Edit2,
  CheckCircle,
  Info,
  Timer,
  Sparkles,
  Users,
} from "lucide-react";

// Mock data (we'll use the same services from the profile)
const initialServices = [
  {
    id: 1,
    name: "Bridal Makeup",
    duration: "120 min",
    price: "199",
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
  },
  {
    id: 2,
    name: "Natural Makeup",
    duration: "60 min",
    price: "89",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
    description:
      "Enhance your natural beauty with our subtle and fresh makeup look. Perfect for daily wear or casual events where you want to look effortlessly beautiful.",
    benefits: [
      "Natural-looking enhancement of your features",
      "Lightweight, breathable products",
      "Suitable for sensitive skin",
      "Quick and efficient application",
    ],
    whatToExpect: [
      "Skin analysis and preparation",
      "Light coverage foundation",
      "Natural eye enhancement",
      "Long-lasting setting techniques",
    ],
    additionalInfo: [
      "Perfect for everyday wear",
      "Products can be customized for skin type",
      "Makeup tips provided during session",
      "Touch-up tips for long-lasting wear",
    ],
    popularWith: [
      "Professionals for work",
      "Students",
      "Natural beauty enthusiasts",
      "First-time makeup users",
    ],
  },
  {
    id: 3,
    name: "Party Makeup",
    duration: "90 min",
    price: "129",
    image:
      "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=800&auto=format&fit=crop",
    description:
      "Get ready to turn heads with our glamorous party makeup service. Whether it's a night out or a special celebration, we'll create a stunning look that lasts all night.",
    benefits: [
      "Bold and glamorous looks",
      "High-quality, long-lasting products",
      "Waterproof options available",
      "Includes dramatic lashes",
    ],
    whatToExpect: [
      "Consultation for desired look",
      "Full coverage foundation",
      "Dramatic eye makeup",
      "Setting for all-night wear",
    ],
    additionalInfo: [
      "Perfect for evening events",
      "Flash photography friendly",
      "Touch-up kit available",
      "Removal tips provided",
    ],
    popularWith: [
      "Party-goers",
      "Event attendees",
      "Birthday celebrations",
      "Night out enthusiasts",
    ],
  },
];

// Add service types constant
const SERVICE_TYPES = [
  "Makeup",
  "Facial Treatment",
  "Nail Art",
  "Eyelash and Eyebrow Services",
  "Waxing and Hair Removal",
  "Bridal Package",
  "Hair Treatment",
  "Manicure & Pedicure",
];

const EditServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState(initialServices);
  const [editingService, setEditingService] = useState(null);

  const handleSave = () => {
    // Here you would typically save the updated services to your backend
    console.log("Saving services:", services);
    navigate(-1);
  };

  const handleEdit = (service) => {
    setEditingService(service);
  };

  const handleDelete = (serviceId) => {
    setServices(services.filter((service) => service.id !== serviceId));
  };

  const handleAddNew = () => {
    const newService = {
      id: Date.now(),
      name: "",
      type: SERVICE_TYPES[0],
      duration: "",
      price: "",
      image: "",
      description: "",
      benefits: [""],
      whatToExpect: [""],
      additionalInfo: [""],
      popularWith: [""],
    };
    setServices([...services, newService]);
    setEditingService(newService);
  };

  const handleUpdate = (updatedService) => {
    setServices(
      services.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    );
    setEditingService(null);
  };

  const ServiceCard = ({ service }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 p-4 bg-white rounded-2xl border shadow-sm transition-all border-border/40 group hover:shadow-md"
    >
      <div className="flex items-center cursor-move text-muted-foreground">
        <GripVertical className="w-5 h-5" />
      </div>
      <div className="flex flex-1 gap-4">
        <div className="overflow-hidden relative w-24 h-24 rounded-xl bg-accent/50">
          {service.image ? (
            <img
              src={service.image}
              alt={service.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{service.name}</h3>
            <span className="text-sm text-muted-foreground">
              {service.type}
            </span>
          </div>
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Clock className="mr-1 w-4 h-4" />
            {service.duration}
          </div>
          <div className="flex items-center mt-2 text-lg font-medium text-primary">
            ${service.price}
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {service.description}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(service)}
          className="p-2 rounded-full transition-colors text-muted-foreground hover:bg-accent/50"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleDelete(service.id)}
          className="p-2 text-red-500 rounded-full transition-colors hover:bg-red-50"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  const EditServiceModal = ({ service, onSave, onCancel }) => {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
      ...service,
      type: service.type || SERVICE_TYPES[0],
      benefits: [...(service.benefits || [""])],
      whatToExpect: [...(service.whatToExpect || [""])],
      additionalInfo: [...(service.additionalInfo || [""])],
      popularWith: [...(service.popularWith || [""])],
    });
    const [imagePreview, setImagePreview] = useState(service.image || null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };

    const handleArrayChange = (field, index, value) => {
      const newArray = [...formData[field]];
      newArray[index] = value;
      setFormData({ ...formData, [field]: newArray });
    };

    const addArrayItem = (field) => {
      setFormData({
        ...formData,
        [field]: [...formData[field], ""],
      });
    };

    const removeArrayItem = (field, index) => {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData({ ...formData, [field]: newArray });
    };

    const renderArrayInputs = (field, title, icon) => (
      <div className="space-y-3">
        <div className="flex gap-2 items-center">
          {icon}
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        {formData[field].map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => handleArrayChange(field, index, e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder={`Add ${title.toLowerCase()}`}
            />
            <button
              onClick={() => removeArrayItem(field, index)}
              className="p-2 text-red-500 rounded-full transition-colors hover:bg-red-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(field)}
          className="flex gap-2 items-center px-4 py-2 text-sm font-medium rounded-xl transition-colors text-primary hover:bg-primary/5"
        >
          <Plus className="w-4 h-4" />
          Add {title}
        </button>
      </div>
    );

    return (
      <div className="flex overflow-y-auto fixed inset-0 z-50 justify-center items-start bg-black/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mx-4 my-8 w-full max-w-3xl bg-white rounded-2xl"
        >
          <div className="flex sticky top-0 z-10 justify-between items-center p-6 bg-white rounded-t-2xl border-b">
            <h2 className="text-xl font-semibold">
              {service.name ? "Edit Service" : "New Service"}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 rounded-full transition-colors hover:bg-accent/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(formData);
            }}
            className="p-6 space-y-6"
          >
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium">
                  Service Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="px-4 py-2 w-full bg-white rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                >
                  {SERVICE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium">
                  Service Name
                </label>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="px-4 py-2 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Duration
                </label>
                <input
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="e.g., 60 min"
                  className="px-4 py-2 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Price ($)
                </label>
                <input
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  type="number"
                  className="px-4 py-2 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium">
                  Service Image
                </label>
                <div className="flex gap-4">
                  <div className="overflow-hidden relative w-32 h-32 rounded-xl bg-accent/50">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex justify-center items-center w-full h-full">
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 text-sm font-medium rounded-xl border transition-colors hover:bg-accent/50"
                    >
                      Take Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.removeAttribute("capture");
                          fileInputRef.current.click();
                          fileInputRef.current.setAttribute(
                            "capture",
                            "environment"
                          );
                        }
                      }}
                      className="px-4 py-2 text-sm font-medium rounded-xl border transition-colors hover:bg-accent/50"
                    >
                      Choose from Gallery
                    </button>
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData({ ...formData, image: null });
                        }}
                        className="px-4 py-2 text-sm font-medium text-red-500 rounded-xl border border-red-500 transition-colors hover:bg-red-50"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="px-4 py-2 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            {/* Lists */}
            <div className="pt-4 space-y-6">
              {renderArrayInputs(
                "benefits",
                "Benefits",
                <Sparkles className="w-5 h-5 text-primary" />
              )}
              {renderArrayInputs(
                "whatToExpect",
                "What to Expect",
                <Timer className="w-5 h-5 text-primary" />
              )}
              {renderArrayInputs(
                "additionalInfo",
                "Additional Information",
                <Info className="w-5 h-5 text-primary" />
              )}
              {renderArrayInputs(
                "popularWith",
                "Popular With",
                <Users className="w-5 h-5 text-primary" />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-3 font-medium rounded-xl border transition-colors hover:bg-accent/50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 font-medium text-white rounded-xl transition-colors bg-primary hover:bg-primary/90"
              >
                Save
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border/40">
        <div className="flex items-center p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full transition-colors hover:bg-accent/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="ml-3 text-xl font-semibold">Edit Services</h1>
        </div>
      </div>

      {/* Services List */}
      <div className="p-4 space-y-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}

        {/* Add New Service Button */}
        <motion.button
          layout
          onClick={handleAddNew}
          className="flex gap-2 justify-center items-center p-4 w-full rounded-2xl border-2 border-dashed transition-colors text-primary border-primary/30 hover:bg-primary/5"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add New Service</span>
        </motion.button>
      </div>

      {/* Edit Modal */}
      {editingService && (
        <EditServiceModal
          service={editingService}
          onSave={handleUpdate}
          onCancel={() => setEditingService(null)}
        />
      )}
    </div>
  );
};

export default EditServices;
