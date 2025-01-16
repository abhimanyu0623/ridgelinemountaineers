import React from "react";
import "../css/OfferSection.css";

const offers = [
  {
    id: 1,
    title: "20% Off on Mountain Adventures",
    description: "Book your mountain adventure today and save big!",
    img: "http://localhost/ridgelinemountaineers/src/components/assets/home/offers/offers1.jpg",
  },
  {
    id: 2,
    title: "Flat 15% Off on Kedarkantha",
    description: "There Lord Shiva became meditated.",
    img: "http://localhost/ridgelinemountaineers/src/components/assets/home/offers/offers2.jpg",
  },
  {
    id: 3,
    title: "Exclusive Deals on Forest Retreats",
    description: "Escape into nature with unbeatable offers.",
    img: "http://localhost/ridgelinemountaineers/src/components/assets/home/offers/offers3.jpg",
  },
  {
    id: 4,
    title: "30% Off on Har ki doon",
    description: "Experience the adventure of trekking",
    img: "http://localhost/ridgelinemountaineers/src/components/assets/home/offers/offers4.jpg",
  },
];

function OfferSection() {
  return (
    <section className="offer-section">
      <h2 className="offer-header">Special Offers</h2>
      <div className="offer-slider">
        <div className="offer-track">
          {offers.map((offer) => (
            <div className="offer-card" key={offer.id}>
              <img
                src={offer.img}
                alt={offer.title}
                className="offer-image"
                loading="lazy"
              />
              <div className="offer-content">
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-description">{offer.description}</p>
              </div>
            </div>
          ))}
          {/* Duplicate offers for seamless looping */}
          {offers.map((offer) => (
            <div className="offer-card" key={`duplicate-${offer.id}`}>
              <img
                src={offer.img}
                alt={offer.title}
                className="offer-image"
                loading="lazy"
              />
              <div className="offer-content">
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-description">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OfferSection;
