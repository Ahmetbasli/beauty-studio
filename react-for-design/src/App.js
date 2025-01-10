import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ArtistDetailPage from "./pages/ArtistDetail";
import LoginPage from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import SignUp from "./pages/SignUp";
import Register from "./pages/Register";
import Bookings from "./pages/Bookings";
import StyleGuide from "./pages/StyleGuide";
import SearchPage from "./pages/Search";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/artist/:id" element={<ArtistDetailPage />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/style-guide" element={<StyleGuide />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
