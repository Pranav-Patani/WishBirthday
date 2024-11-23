import React, { useState, useEffect } from "react";
import "./birthday-card.css";
import drum from "./images/drum.webp";

const images = [`${drum}`, `${drum}`, `${drum}`, `${drum}`];

export default function BirthdayCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      createConfetti();
      setTimeout(() => setShowImages(true), 500);
    } else {
      setShowImages(false);
    }
  };

  const createConfetti = () => {
    const confettiCount = 100;
    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
    ];

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
      confetti.style.animationDelay = Math.random() * 5 + "s";
      document.body.appendChild(confetti);

      confetti.addEventListener("animationend", () => {
        confetti.remove();
      });
    }
  };

  const handleImageClick = (index) => {
    setEnlargedImage(index);
  };

  const handleCloseEnlarged = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="container">
      <div className={`card-container ${isFlipped ? "flipped" : ""}`}>
        <div className="card" onClick={handleCardClick}>
          <div className="card-face card-front">
            <p>Open</p>
          </div>
          <div className="card-face card-back">
            <p>Wish you a very happy birthday!</p>
          </div>
        </div>
      </div>
      <div className={`images-container ${showImages ? "show" : ""}`}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Birthday image ${index + 1}`}
            className="pop-out-image"
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
      {enlargedImage !== null && (
        <div className="enlarged-image-overlay" onClick={handleCloseEnlarged}>
          <div className="enlarged-image-container">
            <img
              src={images[enlargedImage]}
              alt={`Enlarged birthday image ${enlargedImage + 1}`}
              className="enlarged-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
