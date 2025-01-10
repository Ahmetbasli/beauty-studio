import React from "react";
import BottomNav from "../BottomNav";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const noNavPaths = ["/", "/login", "/signup", "/register"];
  const showNav = !noNavPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      <div className={showNav ? "pb-[72px]" : ""}>{children}</div>
      {showNav && <BottomNav />}
    </div>
  );
};

export default Layout;
