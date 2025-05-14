import React, { useState } from "react";
import AvionAmazon from "../assets/AvionAmazon.jpg";
import AmazonDiaMadre from "../assets/AmazonDiaMadre.jpg";
import AmazonJuguetes from "../assets/AmazonJuguetes.jpg";
import "./Carousel.css";

const Carousel = () => {
    const images = [AvionAmazon, AmazonDiaMadre, AmazonJuguetes];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="carousel-container">
            <div className="carousel">
                <button className="arrow left" onClick={prevImage}>❮</button>
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="carousel-image"
                />
                <button className="arrow right" onClick={nextImage}>❯</button>
            </div>
        </div>
    );
};

export default Carousel;
