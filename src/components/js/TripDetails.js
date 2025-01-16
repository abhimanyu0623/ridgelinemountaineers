import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/TripDetails.css";

function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeDay, setActiveDay] = useState(null);
  const [numberOfPersons, setNumberOfPersons] = useState(1);

  useEffect(() => {
    fetch(
      `http://localhost/ridgelinemountaineers/src/backend/fetch_trip_details.php?id=${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setTrip(data[0]); // Set the trip object
          if (data[0].itinerary && data[0].itinerary.length > 0) {
            // Open the first day by default
            setActiveDay(data[0].itinerary[0].day_number);
          }
        } else {
          console.error("No trip data found.");
        }
      })
      .catch((error) => console.error("Error fetching trip details:", error))
      .finally(() => setLoading(false));
  }, [id]);

  const getScheduleStages = (scheduleText) => {
    if (!scheduleText) return [];
    return scheduleText
      .split("\n")
      .map((stage) => stage.trim())
      .filter((stage) => stage !== "");
  };

  const handleAccordionToggle = (dayNumber) => {
    setActiveDay((prevDay) => (prevDay === dayNumber ? null : dayNumber));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!trip) {
    return <p>Trip not found.</p>;
  }

  // Extract the schedule stages from the itinerary
  const itineraryStages = trip.itinerary.map((day) => getScheduleStages(day.schedule));

  return (
    <div className="trip-details-container">
      <h1 className="trip-details-header">{trip.title}</h1>
      <img
        className="trip-details-image"
        src={`http://localhost/ridgelinemountaineers${trip.image}`}
        alt={trip.title}
      />

      {/* Trip Info Section */}
      <div className="trip-info-section">
        <h5>
          <i className="fa fa-map"></i> Route:{" "}
          <span className="short-info">
            {trip.start_from} to {trip.end_to}
          </span>
        </h5>
        <h5>
          <i className="fa fa-clock"></i> Duration:{" "}
          <span className="short-info">{trip.duration}</span>
        </h5>
        <h5>
          <i className="fa fa-bank"></i> Cost:{" "}
          <span className="short-info">₹{trip.price} / Person</span>
        </h5>
        <h5>
          <i className="fa fa-calendar-check"></i> Start:{" "}
          <span className="short-info">{trip.start_datetime}</span>
        </h5>
      </div>
      
      <h5><strong>Kedarkantha</strong> (Hindi: केदारकंठ) is a mountain peak of the <strong>Himalayas</strong> in Uttarakhand, <span>India</span>. Its elevation is 12,500 ft (3,800 m).</h5>

      {/* Main Content Section */}
      <div className="trip-main-content">
        {/* Trip Tabs Section - 80% Width */}
        <div className="trip-tabs" style={{ width: "80%" }}>
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`tab-button ${activeTab === "itinerary" ? "active" : ""}`}
              onClick={() => setActiveTab("itinerary")}
            >
              Detailed Itinerary
            </button>
            <button
              className={`tab-button ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
            <button
              className={`tab-button ${activeTab === "gallery" ? "active" : ""}`}
              onClick={() => setActiveTab("gallery")}
            >
              Gallery
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "overview" && (
              <div className="overview-section">
                <p>{trip.paragraph}</p>
                <p>{trip.excitement}</p>
              </div>
            )}
            {activeTab === "itinerary" && (
              <div className="itinerary-section">
                {trip.itinerary && trip.itinerary.length > 0 ? (
                  <div>
                    {/* Tabs for Days */}
                    <div className="day-tabs">
                      {trip.itinerary.map((day, index) => (
                        <button
                          key={index}
                          className={`day-tab-button ${
                            activeDay === day.day_number ? "active" : ""
                          }`}
                          onClick={() => setActiveDay(day.day_number)}
                        >
                          Day {day.day_number}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="day-tab-contents">
                      {trip.itinerary.map((day, index) => (
                        <div
                          key={index}
                          className={`day-tab-content ${
                            activeDay === day.day_number ? "visible" : "hidden"
                          }`}
                          style={{
                            display: activeDay === day.day_number ? "block" : "none",
                          }}
                        >
                          {/* Short Details */}
                          <span className="short-info">
                            {day.itinerary_title}
                          </span>
                          <p>Distance: {day.distance}</p>

                          {/* Itinerary Image */}
                          <div>
                            <img
                              src={`http://localhost/ridgelinemountaineers${day.itinerary_image}`}
                              alt="Itinerary Image"
                              className="itinerary-image"
                            />
                          </div>

                          {/* Split Layout */}
                          <div className="split-layout">
                            {/* Schedule - 40% */}
                            <div className="schedule-section" style={{ flex: "40%" }}>
                              <h4>Schedule</h4>
                              <div className="timeline">
                                {itineraryStages[index] && itineraryStages[index].length > 0 ? (
                                  itineraryStages[index].map((stage, stageIndex) => (
                                    <div key={stageIndex} className="timeline-item">
                                      <div className="timeline-marker"></div>
                                      <div className="timeline-content">
                                        <p>{stage}</p>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <p>No schedule available.</p>
                                )}
                              </div>
                            </div>

                            {/* Description - 60% */}
                            <div className="description-section" style={{ flex: "60%" }}>
                              <h4>Description</h4>
                              <p>{day.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>No itinerary available for this trip.</p>
                )}
              </div>
            )}



          {activeTab === "history" && (
            <div className="history-section">
              <div dangerouslySetInnerHTML={{ __html: trip.history }} />
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="image-gallery">
              {trip.image_url ? (
                Array.isArray(trip.image_url) ? (
                  trip.image_url.map((url, index) => (
                    <div key={index} className="image-container">
                      <img
                        src={`http://localhost/ridgelinemountaineers${url}`}
                        alt={trip.caption || `Image ${index + 1}`}
                      />
                      {trip.caption && <p className="caption">{trip.caption}</p>}
                    </div>
                  ))
                ) : (
                  <div className="image-container">
                    <img
                      src={`http://localhost:3000/ridgelinemountaineers${trip.image_url}`}
                      alt={trip.caption || "Trip Image"}
                    />
                    {trip.caption && <p className="caption">{trip.caption}</p>}
                  </div>
                )
              ) : (
                <p>No images available.</p>
              )}
            </div>

          )}
          
          </div>
          <div class="maps-graphs">
            <div className="maps-section">
              <h5>Maps</h5>
              <p>Maps will be displayed here.</p>
            </div>
            <div className="graphs-section">
              <h5>Graphs</h5>
              <p>Graphs will be displayed here.</p>
            </div>
          </div>
        </div>

        {/* Booking Form Section - 20% Width */}
        <div className="trip-booking-form" style={{ width: "20%" }}>
          <h3>Book This Trip</h3>
          <p>
            <span className="short-info">₹{trip.price}</span>  + <strong>9% GST</strong>
          </p>
          <p>
            <strong>Total (INR):</strong>{" "}
            <span className="short-info">₹{(trip.price * 1.18).toFixed(2)}</span> {/* Example GST: 18% */}
          </p>
          <form>
            <div>
              <div className="number-control">
                <label>Persons:</label>
                <button type="button" onClick={() => setNumberOfPersons((prev) => Math.max(prev - 1, 1))}>-</button>
                <input type="text" class="form-control" value={numberOfPersons} readOnly />
                <button type="button" onClick={() => setNumberOfPersons((prev) => prev + 1)}>+</button>
              </div>
            </div>
            {/* <div>
              <label>Name:</label>
              <input type="text" class="form-control" placeholder="Enter your name" />
            </div>
            <div>
              <label>Phone:</label>
              <input type="text" class="form-control" placeholder="Enter your phone number" />
            </div> */}
            <h4 className="short-info">Pay: ₹{(trip.price * 1.18 * numberOfPersons).toFixed(2)}</h4>
            <button className="btn btn-primary">Book Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;
