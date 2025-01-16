import React from "react";
import "../css/About.css"; // Dedicated CSS file for About Us styling

function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-image">
          <img
            src="http://localhost/ridgelinemountaineers/src/components/assets/home/about/about1.jpeg" width="400px"
            alt="About Us"
          />
        </div>
        <div className="about-content">
          <h1 className="about-header">About Us</h1>
          <p>
            I have started this endeavor for the people like you who upon hearing the call of the mountain embarks on a journey. The Himalaya offers you thrill, adventure, mystery. The jungles, mountains, night sky will unfurl before you as nowhere in the world. 
          </p>
          <p>
            My team will ensure you are taken to the right path and guide when necessary. When you find yourself among the tallest mountains of the world my job is to ensure your safety deep into the wild. My job is to keep you well rested after a full day of physical and mental stress. It is my responsibility to serve you nutritious and tasty food so that you don’t get tired. Ridgeline mountaineers offer you seasoned guide who are molded with Himalayan patience, softest humility. These strong brave people carry our brand.
          </p>
          <p>
            There will be nothing more rewarding for us than when you complete this journey with more zeal to come back to the mountain.
          </p>
          <button className="btn btn-primary rounded-pill">Learn More</button>
        </div>
      </div>
    </section>
  );
}

export default About;
