import React, { useState } from 'react';

const HomePage = (props) => {
  const images = ['gym1.png', 'gym2.png', 'gym3.png'];
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
        <div id="space">
            
        </div>
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
   <p><img src="email-img.png"/> myGym@gmail.com</p>
    <p><img src="phone-img.png"/> +973 33333333</p>
    <p><img src="map-img.png"/> Manama, Bahrain</p>
  </div>


    </>
  );
};


export default HomePage;