import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'; // Correct module imports
import 'swiper/css';
import 'swiper/css/pagination'; // Import styles for pagination
import '../css/HeroSlider.css';

// Import images for Kedarkantha
import kedarkantha1 from '../assets/home/heroSlider/kedarkantha1.jpg';
import kedarkantha2 from '../assets/home/heroSlider/kedarkantha2.jpg';
import kedarkantha3 from '../assets/home/heroSlider/kedarkantha3.jpg';

// Import images for Har Ki Doon
import harkidoon1 from '../assets/home/heroSlider/harkidoon1.jpg';
import harkidoon2 from '../assets/home/heroSlider/harkidoon2.jpg';
import harkidoon3 from '../assets/home/heroSlider/harkidoon3.jpg';

const HeroSlider = () => {
  const [activeTab, setActiveTab] = useState('kedarkantha'); // Default tab

  // Images for each tab
  const kedarkanthaImages = [kedarkantha1, kedarkantha2, kedarkantha3];
  const harkidoonImages = [harkidoon1, harkidoon2, harkidoon3];

  // Set active tab on click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="hero-slider">
      {/* Tabs */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'kedarkantha' ? 'active' : ''}`}
          onClick={() => handleTabClick('kedarkantha')}
        >
          Kedarkantha
        </div>
        <div
          className={`tab ${activeTab === 'harkidoon' ? 'active' : ''}`}
          onClick={() => handleTabClick('harkidoon')}
        >
          Har Ki Doon
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 3000, // Auto-slide delay
          disableOnInteraction: false, // Keep autoplay after user interaction
        }}
        loop={true} // Infinite loop
        pagination={{ clickable: true }} // Pagination dots
        speed={3000} // Smooth transition duration (1 second)
        modules={[Autoplay, Pagination]} // Register modules
      >
        {/* Render Kedarkantha Images */}
        {activeTab === 'kedarkantha' &&
          kedarkanthaImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Kedarkantha Trek ${index + 1}`} />
            </SwiperSlide>
          ))}

        {/* Render Har Ki Doon Images */}
        {activeTab === 'harkidoon' &&
          harkidoonImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Har Ki Doon Trek ${index + 1}`} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
