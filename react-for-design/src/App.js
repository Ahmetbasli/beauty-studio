import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ArtistDetailPage from "./pages/ArtistDetail";
import LoginPage from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import SignUp from "./pages/SignUp";
import Register from "./pages/Register";
import QuickBook from "./pages/QuickBook";
import TopRated from "./pages/TopRated";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/artist/:id" element={<ArtistDetailPage />} />
        <Route path="/quick-book" element={<QuickBook />} />
        <Route path="/top-rated" element={<TopRated />} />
      </Routes>
    </Router>
  );
}

export default App;
