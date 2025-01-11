import React, { useState } from "react";
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
  },
  {
    id: 2,
    name: "Natural Makeup",
    duration: "60 min",
    price: "89",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Party Makeup",
    duration: "90 min",
    price: "129",
    image:
      "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=800&auto=format&fit=crop",
  },
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
      duration: "",
      price: "",
      image: "",
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
      className="flex gap-4 p-4 bg-white rounded-2xl border shadow-sm border-border/40 group"
    >
      <div className="flex items-center text-muted-foreground cursor-move">
        <GripVertical className="w-5 h-5" />
      </div>
      <div className="flex flex-1 gap-4">
        <div className="relative w-20 h-20 overflow-hidden rounded-xl bg-accent/50">
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
          <h3 className="font-medium">{service.name}</h3>
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Clock className="mr-1 w-4 h-4" />
            {service.duration}
          </div>
          <div className="flex items-center mt-1 text-sm font-medium text-primary">
            <DollarSign className="w-4 h-4" />
            {service.price}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(service)}
          className="p-2 text-muted-foreground transition-colors rounded-full hover:bg-accent/50"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleDelete(service.id)}
          className="p-2 text-red-500 transition-colors rounded-full hover:bg-red-50"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  const EditServiceModal = ({ service, onSave, onCancel }) => (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 mx-4 w-full max-w-md bg-white rounded-2xl"
      >
        <div className="flex justify-between items-center mb-6">
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
            const formData = new FormData(e.target);
            const updatedService = {
              ...service,
              name: formData.get("name"),
              duration: formData.get("duration"),
              price: formData.get("price"),
              image: formData.get("image"),
            };
            onSave(updatedService);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block mb-2 text-sm font-medium">
              Service Name
            </label>
            <input
              name="name"
              defaultValue={service.name}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Duration</label>
            <input
              name="duration"
              defaultValue={service.duration}
              placeholder="e.g., 60 min"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Price ($)</label>
            <input
              name="price"
              type="number"
              defaultValue={service.price}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Image URL</label>
            <input
              name="image"
              type="url"
              defaultValue={service.image}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 font-medium border rounded-xl hover:bg-accent/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 font-medium text-white rounded-xl bg-primary hover:bg-primary/90 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

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
            <h1 className="text-xl font-semibold">Edit Services</h1>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 text-sm font-medium text-white rounded-full bg-primary hover:bg-primary/90 transition-colors"
          >
            Save
          </button>
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
          className="flex justify-center items-center gap-2 p-4 w-full text-primary border-2 border-dashed border-primary/30 rounded-2xl hover:bg-primary/5 transition-colors"
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
