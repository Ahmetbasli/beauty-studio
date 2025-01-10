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
import ServiceDetail from "./pages/ServiceDetail";
import ArtistServices from "./pages/ArtistServices";
import ArtistPortfolio from "./pages/ArtistPortfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import ArtistReviews from "./pages/ArtistReviews";
import Payment from "./pages/Payment";
import Layout from "./components/Layout";
import BookingDetail from "./pages/BookingDetail";

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
          <Route path="/artist/:id/services" element={<ArtistServices />} />
          <Route path="/artist/:id/portfolio" element={<ArtistPortfolio />} />
          <Route
            path="/artist/:id/portfolio/:imageIndex"
            element={<PortfolioDetail />}
          />
          <Route path="/artist/:id/reviews" element={<ArtistReviews />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/booking/:id" element={<BookingDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/style-guide" element={<StyleGuide />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
