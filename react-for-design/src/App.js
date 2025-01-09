import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ArtistDetailPage from "./pages/ArtistDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artist/:id" element={<ArtistDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
