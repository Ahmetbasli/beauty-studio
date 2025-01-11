import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, CalendarClock, User, CalendarDays } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isArtistDashboard = location.pathname.startsWith("/artist");

  const navItems = [
    {
      label: isArtistDashboard ? "Dashboard" : "Home",
      icon: Home,
      path: isArtistDashboard ? "/artist/dashboard" : "/home",
    },
    {
      label: "Bookings",
      icon: isArtistDashboard ? CalendarDays : CalendarClock,
      path: isArtistDashboard ? "/artist/bookings" : "/bookings",
    },
    {
      label: "Profile",
      icon: User,
      path: isArtistDashboard ? "/artist/profile" : "/profile",
    },
  ];

  return (
    <div className="fixed right-0 bottom-0 left-0 border-t bg-background border-border/40">
      <div className="flex justify-around items-center px-4 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center px-6 py-2"
            >
              <Icon
                className={`w-6 h-6 mb-1 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-xs ${
                  isActive
                    ? "font-medium text-primary"
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
