// ImageGallery.js
import React, { useState, useEffect } from "react";
import "./GalleryHome.css";

// URLs das imagens
const images = [
  "https://i.postimg.cc/LXBYhJSh/01.jpg",
  "https://i.postimg.cc/bryGnqYg/02.jpg",
  "https://i.postimg.cc/0QqK8pLL/03.jpg",
  "https://i.postimg.cc/0jVzdhbs/04.jpg",
  "https://i.postimg.cc/fTbtTWrT/05.jpg",
  "https://i.postimg.cc/HWz8g83h/06.jpg",
];

const GalleryHome = ({ interval = 3000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer); // Limpar o intervalo ao desmontar o componente
  }, [images.length, interval]);

  return (
    <div className="image-gallery">
      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex}`}
        className="gallery-image"
      />
    </div>
  );
};

export default GalleryHome;
