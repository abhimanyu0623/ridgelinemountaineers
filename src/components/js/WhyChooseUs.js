import React from "react";
import "../css/WhyChooseUs.css"; // Add a CSS file for styling.

const WhyChooseUs = () => {
  const features = [
    {
      icon: "fa-map-marker-alt",
      title: "Unique Locations",
      description: "Discover hidden gems and offbeat locations worldwide.",
    },
    {
      icon: "fa-shield-alt",
      title: "Safe and Secure",
      description: "Travel with confidence, knowing safety is our priority.",
    },
    {
      icon: "fa-inr",
      title: "Affordable Pricing",
      description: "Enjoy trips that fit your budget without compromising quality.",
    },
    {
      icon: "fa-star",
      title: "Top-notch Service",
      description: "Experience exceptional service from our dedicated team.",
    },
  ];

  return (
    <section className="why-choose-us">
      <div className="container">
        <h1 className="why-choose-us-header">Why Choose Us</h1>
        <p>Here’s why mountaineers love our services</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <i className={`fas ${feature.icon}`}></i>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video background and overlay content */}
      <div className="video-background">
        <video autoPlay loop muted className="video-element" onError={(e) => console.log("Error loading video:", e)}>
          <source src="/assets/home/weather/schedule-trip.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="overlay-content">
          <h2>Planning a trek for 2025?</h2>
          <p>Talk to Our Experts First</p>
          <p>
            Our Trek Advisors have helped over 2,500 trekkers plan treks in 2024.
            They're here to help you start 2025 with the right trek.
          </p>
          <button className="btn btn-primary rounded-pill">Schedule a call now</button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
