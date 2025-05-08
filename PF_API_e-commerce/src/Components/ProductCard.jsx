// ProductCard.js
import React from "react";
import "./ProductCard.css";

// Recibe directamente las propiedades del producto, no solo el id
const ProductCard = ({ image, title, description, price }) => {
    // No se necesita fetch, loading, ni error aquí si Home.js ya tiene los datos.

    // Si alguna propiedad esencial no llega, puedes mostrar un mensaje o nada.
    if (!title) {
        return <p>Información del producto no disponible.</p>;
    }

    return (
        <div className="product-card">
            <img src={image} alt={title} className="product-image" />
            <h3 className="product-title">{title}</h3>
            {/* Es posible que 'description' no exista en tu JSON para la vista de tarjeta,
                así que puedes optar por mostrar el título o un extracto si es necesario */}
            <p className="product-description">{description || title}</p>
            <p className="product-price">${String(price)}</p> {/* Convertir a string por si acaso */}
        </div>
    );
};

export default ProductCard;