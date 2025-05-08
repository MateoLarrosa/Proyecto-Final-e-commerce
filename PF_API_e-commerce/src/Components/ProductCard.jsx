import React from "react";
import "./ProductCard.css";

const ProductCard = ({ image, images, title, description, price }) => {
    return (
        <div className="product-card">
            {/* Mostrar una imagen o varias */}
            {images ? (
                <div className="product-images-grid">
                    {images.map((imgObj, index) => (
                        <div key={index} className="image-with-text">
                            <img src={imgObj.src} alt={`${title} ${index}`} className="product-image" />
                            <p className="image-description">{imgObj.text}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <img src={image} alt={title} className="product-image" />
            )}

            <h3 className="product-title">{title}</h3>
            <p className="product-description">{description}</p>
        </div>
    );
};

export default ProductCard;
