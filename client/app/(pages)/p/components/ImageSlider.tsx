import React, { useState, useEffect } from "react";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeSlide = (direction: number) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + direction + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Slide ${index + 1}`}
            className="h-full w-full object-cover transition-opacity duration-1000"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              position: "absolute",
              transition: "opacity 1s ease-in-out",
            }}
            aria-hidden={index !== currentIndex}
          />
        ))}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          onClick={() => changeSlide(-1)}
          aria-label="Previous slide"
        >
          &lt;
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          onClick={() => changeSlide(1)}
          aria-label="Next slide"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
