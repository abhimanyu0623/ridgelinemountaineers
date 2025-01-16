import React, { useEffect, useState } from "react";
import "../css/Trips.css"; // External CSS file
import { useNavigate } from "react-router-dom";

function Trips() {
  const [trips, setTrips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/ridgelinemountaineers/src/backend/fetch_trips.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCardClick = (tripId) => {
    navigate(`/trip-details/${tripId}`);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={`trips-container ${isModalOpen ? "blurred" : ""}`}>
        <h1 className="trips-header">Available Treks</h1>
        <div className="trips-list">
          {trips.length > 0 ? (
            trips.map((trip) => (
              <div
                className="trip-card"
                key={trip.id}
                onClick={() => handleCardClick(trip.id)}
              >
                <img
                  className="trip-image"
                  src={`http://localhost/ridgelinemountaineers${trip.image}`}
                  alt={trip.title}
                />
                <h2 className="trip-title">{trip.title}</h2>
                <div className="trip-details">
                  <h4>
                    <strong>
                      {trip.start_from} - {trip.end_to}
                    </strong>
                  </h4>
                  <div className="trip-info">
                    <div className="trip-column">
                      <strong>{trip.duration}</strong>
                    </div>
                    <div className="trip-column">
                      <strong>₹{trip.price}</strong>
                    </div>
                  </div>
                </div>
                <h6 className="itinerary-title">Short Itinerary:</h6>
                <ul className="itinerary-list">
                  {trip.itinerary.map((day) => (
                    <li key={day.day_number} className="itinerary-day">
                      <span className="day-count">Day {day.day_number}:</span>{" "}
                      <strong>{day.from_location}</strong> to{" "}
                      <strong>{day.to_location}</strong>
                      <br />
                      <span className="text-medium">{day.drive_distance}</span>{" "}
                      | <span className="text-medium">{day.height}</span> |{" "}
                      <span className="text-medium">{day.time_taken}</span>
                      <p>{day.description}</p>
                    </li>
                  ))}
                </ul>
                <div className="trip-booking">
                  <button
                    className="btn btn-primary rounded-pill"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleModal();
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="loading-text">Loading trips...</p>
          )}
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Close Button in Top-Right Corner */}
            <div className="modal-header">
              <button className="modal-close-button" onClick={toggleModal}>
                <i className="bx bx-x-circle fa-2x"></i>
              </button>
            </div>
            <h2 className="modal-title">Book your Trip</h2>
            <p className="modal-description">
              We are here to help you plan your next adventure. Choose your preferred option to reach out to us!
            </p>

            {/* Contact Options */}
            <div className="contact-options">
              <div
                className="contact-option call-option"
                onClick={() => alert("Calling: +91-1234567890")}
              >
                <i className="bx bx-phone fa-4x call-icon"></i>
                <h3>Call Us</h3>
                <h5>+91-1234567890</h5>
              </div>
              <div
                className="contact-option whatsapp-option"
                onClick={() =>
                  window.open(
                    "https://wa.me/911234567890",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <i className="bx bxl-whatsapp fa-4x whatsapp-icon"></i>
                <h3>WhatsApp Us</h3>
                <h5>+91-1234567890</h5>
              </div>
              <div
                className="contact-option email-option"
                onClick={() =>
                  window.open(
                    "mailto:info@ridgelinemountaineers.com?subject=Inquiry&body=Hi Team, I’d like to know more about...",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <i className="bx bx-envelope fa-4x email-icon"></i>
                <h3>Email Us</h3>
                <p>info@ridgelinemountaineers.com</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default Trips;
