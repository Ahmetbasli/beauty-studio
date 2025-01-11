import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  CalendarClock,
  User,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isArtist = localStorage.getItem("selectedRole") === "artist";

  const artistNavItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/artist/dashboard",
    },
    {
      label: "Bookings",
      icon: CalendarClock,
      path: "/artist/bookings",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/profile",
    },
  ];

  const customerNavItems = [
    {
      label: "Home",
      icon: Home,
      path: "/home",
    },
    {
      label: "Bookings",
      icon: CalendarClock,
      path: "/bookings",
    },
    {
      label: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  const navItems = isArtist ? artistNavItems : customerNavItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background border-border/40">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center py-2 px-6"
            >
              <item.icon
                className={`w-6 h-6 mb-1 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-xs ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
