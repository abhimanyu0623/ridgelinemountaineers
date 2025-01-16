// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/js/Header";
import Footer from "./components/js/Footer";
import HeroSlider from "./components/js/HeroSlider";
import OfferSection from "./components/js/OfferSection";
import Trips from "./components/js/Trips";
import About from "./components/js/About";
import WhyChooseUs from "./components/js/WhyChooseUs";
import Gallery from "./components/js/Gallery";
import ContactUs from "./components/js/ContactUs";
import TripDetails from "./components/js/TripDetails";
import WeatherUpdates from './components/js/WeatherUpdates';

const App = () => {
  return (
    <Router>
      {/* Header appears on all pages */}
      <Header />

      {/* Define the Routes */}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div>
              <HeroSlider />
              <WeatherUpdates lat="31.02257" lon="78.17185" />
              <Trips />
              <OfferSection />
              <WhyChooseUs />
              <Gallery />
              <About />
            </div>
          }
        />

        {/* Dedicated Pages */}
        <Route path="/trips" element={<Trips />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/trip-details/:id" element={<TripDetails />} />
      </Routes>

      {/* Footer appears on all pages */}
      <Footer />
    </Router>
  );
};

export default App;
