import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ArtistDetailPage from "./pages/ArtistDetail";
import LoginPage from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/artist/:id" element={<ArtistDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
