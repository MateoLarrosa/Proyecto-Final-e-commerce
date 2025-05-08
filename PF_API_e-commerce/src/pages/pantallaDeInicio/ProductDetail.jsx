import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ProductDetail.css'; // Asegúrate de tener un archivo de estilos

const ProductDetails = () => {
const { id } = useParams(); // Obtiene el ID del producto desde la URL
const navigate = useNavigate(); // Función para navegar entre rutas

// Estado para los detalles del producto
const [product, setProduct] = useState(null);
const [isAdmin, setIsAdmin] = useState(false); // Estado para controlar si el usuario es administrador

useEffect(() => {
// Aquí puedes hacer una llamada a la API para obtener los detalles del producto
const fetchProduct = async () => {
    const fetchedProduct = {
    id: id,
    image: "ruta-a-la-imagen-del-producto.jpg",
    title: "Producto Detallado",
    description: "Descripción más amplia del producto que cubre todas sus características, detalles de fabricación y posibles aplicaciones. Este producto es ideal para aquellos que buscan calidad y durabilidad.",
    price: "$100",
    };
    setProduct(fetchedProduct);

    // Suponiendo que el estado de admin es estático para este ejemplo, puedes modificarlo según tu lógica
    setIsAdmin(true); // Cambiar a false si el usuario no es administrador
};

fetchProduct();
}, [id]);

// Agregar al carrito
const addToCart = () => {
alert("Producto agregado al carrito.");
// Lógica para agregar al carrito (puedes usar Redux, contexto, etc.)
};

// Agregar stock
const addStock = () => {
alert("Stock agregado.");
// Lógica para agregar stock al producto (esto sería manejado solo si el usuario es administrador)
};

if (!product) return <div>Cargando...</div>; // Muestra un mensaje mientras carga el producto

return (
<div className="product-details-container">
    <div className="product-details">
    <div className="product-images">
        <img src={product.image} alt={product.title} className="product-image" />
    </div>

    <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price"><strong>{product.price}</strong></p>

        {/* Botones para interactuar con el producto */}
        <div className="buttons-container">
        <button className="add-to-cart" onClick={addToCart}>Agregar al carrito</button>

        {isAdmin && (
            <button className="add-stock" onClick={addStock}>Agregar Stock</button>
        )}
        </div>

        {/* Botón para volver a la página principal */}
        <button className="back-button" onClick={() => navigate("/")}>Volver a la tienda</button>
    </div>
    </div>
</div>
);
};

export default ProductDetails;
