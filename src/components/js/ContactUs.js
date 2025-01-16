import React from "react";
import "../css/ContactUs.css";

function ContactUs() {
  return (
    <div className="contact-container">
      <h1 className="page-header">Contact Us</h1>
      <div className="contact-content">
        {/* Left Side: Image */}
        <div className="contact-image">
          <img
            src="http://localhost/ridgelinemountaineers/src/components/assets/home/contact2.jpg" // Replace with your image URL
            alt="Contact Us"
          />
        </div>

        {/* Right Side: Form */}
        <div className="contact-form-container">
          <form className="contact-form">
            <div className="col-md-6">
              <label>Name</label>
              <input type="text" placeholder="Your Name" />
            </div>
            <div className="row">
              <div className="col-md-6">
                <label>Email</label>
                <input type="email" placeholder="Your Email" />
              </div>
              <div className="col-md-6">
                <label>Phone</label>
                <input type="phone" placeholder="Mobile No" />
              </div>
            </div>

            <label>Message</label>
            <textarea placeholder="Your Message"></textarea>
            <div className="contact-submit">
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;