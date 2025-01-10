import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Mail,
  Phone,
  Globe,
  Users,
  Languages,
  Bookmark,
  UserCog,
  Bell,
  Shield,
  Settings2,
  FileText,
  Database,
  Star,
  Activity,
  CreditCard,
  HelpCircle,
} from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();

  const accountItems = [
    {
      icon: <Activity className="w-5 h-5" />,
      label: "My Activity",
      description: "See ongoing & history",
      path: "/activity",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Payment Methods",
      path: "/payments",
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      label: "Help center",
      path: "/help",
    },
    {
      icon: <Languages className="w-5 h-5" />,
      label: "Change language",
      path: "/language",
    },
    {
      icon: <Bookmark className="w-5 h-5" />,
      label: "Saved addresses",
      path: "/addresses",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Invite Friends",
      path: "/invite",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Notifications",
      path: "/notifications",
    },
    {
      icon: <Settings2 className="w-5 h-5" />,
      label: "Manage account",
      path: "/manage",
    },
  ];

  const generalItems = [
    {
      icon: <Shield className="w-5 h-5" />,
      label: "Privacy Policy",
      path: "/privacy",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Terms of Service",
      path: "/terms",
    },
    {
      icon: <Database className="w-5 h-5" />,
      label: "Data attribution",
      path: "/data",
    },
    {
      icon: <Star className="w-5 h-5" />,
      label: "Rate Beauty App",
      path: "/rate",
      version: "5.6.1",
    },
  ];

  const MenuItem = ({ item }) => (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => navigate(item.path)}
      className="flex items-center w-full gap-4 px-2 py-3 transition-colors rounded-lg hover:bg-accent group"
    >
      <div className="text-muted-foreground group-hover:text-foreground">
        {item.icon}
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <span className="font-medium">{item.label}</span>
          {item.badge && (
            <span className="px-2 py-0.5 text-xs font-medium text-white bg-primary rounded">
              {item.badge}
            </span>
          )}
        </div>
        {item.description && (
          <span className="block text-sm text-muted-foreground">
            {item.description}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {item.version && (
          <span className="text-sm text-muted-foreground">{item.version}</span>
        )}
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-background border-border/40">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-1 transition-colors rounded-full hover:bg-accent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">My Profile</h1>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 py-6 border-b border-border/40">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 overflow-hidden rounded-full bg-primary/10">
              <img
                src="https://i.pravatar.cc/150?img=36"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Nadya</h2>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>nadya.nadya@gmail.com</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+628134178439</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/profile/edit")}
            className="p-2 transition-colors rounded-full hover:bg-accent"
          >
            <Edit2 className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Account Section */}
      <div className="px-4 py-3">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          Account
        </h3>
        <div className="space-y-1">
          {accountItems.map((item, index) => (
            <MenuItem
              key={item.label}
              item={{ ...item, delay: index * 0.05 }}
            />
          ))}
        </div>
      </div>

      {/* General Section */}
      <div className="px-4 py-3">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          General
        </h3>
        <div className="space-y-1">
          {generalItems.map((item, index) => (
            <MenuItem
              key={item.label}
              item={{ ...item, delay: (index + accountItems.length) * 0.05 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
