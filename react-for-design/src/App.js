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
import ProfilePage from "./pages/Profile";
import EditProfilePage from "./pages/Profile/EditProfile";
import ArtistDashboard from "./pages/ArtistDashboard";
import ArtistBookings from "./pages/ArtistBookings";
import ArtistBookingHistory from "./pages/ArtistBookingHistory";
import ArtistBookingDetail from "./pages/ArtistBookingDetail";
import ArtistBookingCancellation from "./pages/ArtistBookingCancellation";
import ArtistEarnings from "./pages/ArtistEarnings";
import ArtistWithdrawal from "./pages/ArtistWithdrawal";
import ArtistProfile from "./pages/ArtistProfile";
import EditServices from "./pages/ArtistProfile/EditServices";
import EditBio from "./pages/ArtistProfile/EditBio";
import ArtistAvailability from "./pages/ArtistAvailability";

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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/artist/dashboard" element={<ArtistDashboard />} />
          <Route path="/artist/bookings" element={<ArtistBookings />} />
          <Route
            path="/artist/bookings/:id"
            element={<ArtistBookingDetail />}
          />
          <Route
            path="/artist/bookings/history"
            element={<ArtistBookingHistory />}
          />
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
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route
            path="/artist/bookings/:id/cancel"
            element={<ArtistBookingCancellation />}
          />
          <Route path="/artist/earnings" element={<ArtistEarnings />} />
          <Route path="/artist/withdrawal" element={<ArtistWithdrawal />} />
          <Route path="/artist/profile" element={<ArtistProfile />} />
          <Route
            path="/artist/profile/edit-services"
            element={<EditServices />}
          />
          <Route path="/artist/profile/edit-bio" element={<EditBio />} />
          <Route path="/artist/availability" element={<ArtistAvailability />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
