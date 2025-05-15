// ProductCard.js
import React from "react";
import "./ProductCard.css";

// Recibe directamente las propiedades del producto, no solo el id
const ProductCard = ({ image, title, description, price, stock }) => {
    // No se necesita fetch, loading, ni error aquí si Home.js ya tiene los datos.

    // Si alguna propiedad esencial no llega, puedes mostrar un mensaje o nada.
    if (!title) {
        return <p>Información del producto no disponible.</p>;
    }

    // Determinar el estado del stock
    const getStockStatus = (stockLevel) => {
        if (stockLevel === 0) return { class: 'out-of-stock', text: 'Agotado' };
        if (stockLevel <= 5) return { class: 'low-stock', text: 'Últimas unidades' };
        if (stockLevel <= 10) return { class: 'medium-stock', text: 'Stock bajo' };
        return { class: '', text: '' };
    };

    const stockStatus = getStockStatus(stock);

    return (
        <div className="product-card">
            <img src={image} alt={title} className="product-image" />
            <h3 className="product-title">{title}</h3>
            <p className="product-description">{description || title}</p>
            <p className="product-price">${String(price)}</p>
            {stockStatus.text && (
                <div className={`stock-indicator ${stockStatus.class}`}>
                    {stockStatus.text}
                </div>
            )}
        </div>
    );
};

export default ProductCard;