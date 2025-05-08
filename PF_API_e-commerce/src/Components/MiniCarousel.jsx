import React, { useState } from "react";
import "./MiniCarousel.css";

const MiniCarousel = ({ images }) => {
    const [current, setCurrent] = useState(0);

    const visibleCount = 3; // cuántas imágenes se muestran a la vez
    const scrollCount = 2; // cuántas se avanza por click

    const prevSlide = () => {
        setCurrent((prev) => Math.max(prev - scrollCount, 0));
    };

    const nextSlide = () => {
        setCurrent((prev) =>
            Math.min(prev + scrollCount, images.length - visibleCount)
        );
    };

    const visibleImages = images.slice(current, current + visibleCount);

    return (
        <div className="mini-carousel">
            <button className="carousel-button left" onClick={prevSlide}>
                &#10094;
            </button>
            <div className="carousel-track">
                {visibleImages.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Slide ${current + index}`}
                        className="carousel-image"
                    />
                ))}
            </div>
            <button className="carousel-button right" onClick={nextSlide}>
                &#10095;
            </button>
        </div>
    );
};

export default MiniCarousel;
