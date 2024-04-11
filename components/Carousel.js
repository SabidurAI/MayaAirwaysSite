import React, { useState } from 'react';

export default function Carousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
  
    return (
      <div className="carousel">
        <button onClick={handlePrev}>Previous</button>
        <img src={images[currentIndex]} alt={`Project ${currentIndex + 1}`} />
        <button onClick={handleNext}>Next</button>
      </div>
    );
  }