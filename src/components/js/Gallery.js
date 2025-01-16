import React from "react";
import "../css/Gallery.css"; // Dedicated CSS file for the gallery

const images = [
  { id: 1, src: "http://localhost/ridgelinemountaineers/src/components/assets/home/gallery/gallery1.jpg", place: "Place A", description: "A breathtaking view of the mountains." },
  { id: 2, src: "http://localhost/ridgelinemountaineers/src/components/assets/home/gallery/gallery2.jpg", place: "Place B", description: "Explore serene landscapes and vibrant sunsets." },
  { id: 3, src: "http://localhost/ridgelinemountaineers/src/components/assets/home/gallery/gallery3.jpg", place: "Place C", description: "Discover hidden gems amidst the wilderness." },
  { id: 4, src: "http://localhost/ridgelinemountaineers/src/components/assets/home/gallery/gallery4.jpg", place: "Place D", description: "Experience thrilling adventures under open skies." },
  { id: 5, src: "http://localhost/ridgelinemountaineers/src/components/assets/home/gallery/gallery5.jpg", place: "Place E", description: "Unwind in nature's lap with spectacular views." },
  { id: 6, src: "http://localhost/ridgelinemountaineers/src/components/assets/home/gallery/gallery6.jpg", place: "Place F", description: "Find peace and tranquility in the heart of nature." },
  { id: 7, src: "http://localhost/ridgelinemountaineers/src/components/assets/home/gallery/gallery7.jpg", place: "Place G", description: "Walk through lush green trails and scenic beauty." },
  { id: 8, src: "http://localhost/ridgelinemountaineers/src/components/assets/home/gallery/gallery8.jpg", place: "Place H", description: "Enjoy breathtaking sunrise views from hilltops." },
  { id: 9, src: "http://localhost/ridgelinemountaineers/src/components/assets/home/gallery/gallery9.jpg", place: "Place I", description: "A paradise for adventure seekers and nature lovers." },
  { id: 10, src: "http://localhost/ridgelinemountaineers/src/components/assets/home/gallery/gallery10.jpg", place: "Place J", description: "Embrace the journey to your dream destinations." },
  { id: 11, src: "http://localhost/ridgelinemountaineers/src/components/assets/home/gallery/gallery11.jpg", place: "Place K", description: "Witness nature's grandeur in all its glory." },
  { id: 12, src: "http://localhost/ridgelinemountaineers/src/components/assets/home/gallery/gallery12.jpg", place: "Place L", description: "Reconnect with nature in serene surroundings." },
];

function Gallery() {
  return (
    <section className="gallery-section">
      <h1 className="gallery-header">Our Stunning Gallery</h1>
      <p className="gallery-subheader">Dive into the captivating visuals of the places we explore. Each image tells a story of adventure, beauty, and serenity.</p>
      <div className="gallery-container">
        {images.map((image) => (
          <div className="gallery-item" key={image.id}>
            <img src={image.src} alt={image.alt} className="gallery-image" />
            <div className="gallery-overlay">
              <div className="gallery-content">
                <h3 className="place-name">{image.place}</h3>
                <p className="place-description">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
