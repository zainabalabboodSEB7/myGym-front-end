import React, { useState } from 'react';
import gym1 from '../../assets/images/gym1.png';
import gym2 from '../../assets/images/gym2.png';
import gym3 from '../../assets/images/gym3.png';
import emailImg from '../../assets/images/email-img.png';
import phoneImg from '../../assets/images/phone-img.png';
import mapImg from '../../assets/images/map-img.png';

const HomePage = (props) => {
  const images = [gym1, gym2, gym3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <div className="carousel-container">
        <div id="space"></div>
        <div
          className="carousel-image"
          onMouseEnter={handleMouseEnter}
        >
          <img
            src={images[currentImageIndex]}
            alt="Carousel"
          />
        </div>
        <div className="dots-container">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => handleDotClick(index)}
              className={`dot ${currentImageIndex === index ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <div id="startNow-P">
        <h2>My Gym</h2>
        <p>My Gym is a welcoming fitness center that focuses on personalized training and community support to help everyone achieve their health goals.</p>
        <button id="startNowBtn">START NOW</button>
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <p><img src={emailImg} alt="Email" /> myGym@gmail.com</p>
        <p><img src={phoneImg} alt="Phone" /> +973 33333333</p>
        <p><img src={mapImg} alt="Location" /> Manama, Bahrain</p>
      </div>
    </>
  );
};

export default HomePage;