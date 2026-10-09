import { useState } from "react";

export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const handlePrev = () => {
    // Si estamos en la primera, volvemos a la última
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    // Si estamos en la última, volvemos a la primera
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="w3-display-container w3-margin-bottom" style={{ width: "100%", overflow: "hidden" }}>
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt || `Slide ${currentIndex + 1}`}
        style={{ width: "100%", display: "block" }}
      />
      
      {/* Solo mostramos controles si hay más de 1 imagen */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="w3-button w3-display-left w3-black w3-opacity w3-hover-opacity-off"
            onClick={handlePrev}
            style={{ padding: "8px 16px" }}
          >
            &#10094;
          </button>
          <button
            type="button"
            className="w3-button w3-display-right w3-black w3-opacity w3-hover-opacity-off"
            onClick={handleNext}
            style={{ padding: "8px 16px" }}
          >
            &#10095;
          </button>
          
          {/* Indicador de posición opcional (dots) */}
          <div className="w3-display-bottommiddle w3-large w3-container w3-padding-16">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w3-badge ${idx === currentIndex ? "w3-white" : "w3-transparent w3-border"}`}
                style={{ cursor: "pointer", height: "13px", width: "13px", padding: 0, margin: "0 2px" }}
                onClick={() => setCurrentIndex(idx)}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
