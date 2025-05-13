// ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ProductDetail.css'; // Asegúrate de tener un archivo de estilos

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // Considera cómo determinar esto realmente
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true); // Inicia la carga aquí también
            setError(null);  // Resetea el error
            try {
                const response = await fetch(`http://localhost:3001/productos/${id}`);
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const fetchedProduct = await response.json();

                // *** INICIO DE MODIFICACIÓN: Mapear los datos ***
                const transformedProduct = {
                    id: fetchedProduct.id,
                    title: fetchedProduct.nombre,       // Mapear nombre a title
                    price: fetchedProduct.precio,       // Mapear precio a price
                    category: fetchedProduct.categoria, // Mapear categoria a category
                    image: fetchedProduct.imagen,       // Mapear imagen a image
                    // Aquí sí podrías tener un campo 'descripcion' más detallado en tu JSON.
                    // Si no, usa 'nombre' o el campo que corresponda.
                    description: fetchedProduct.descripcion_detallada || fetchedProduct.nombre,
                    stock: fetchedProduct.stock
                    // Agrega cualquier otro campo que necesites y mapea si es necesario
                };
                setProduct(transformedProduct);
                // *** FIN DE MODIFICACIÓN ***

            } catch (err) {
                setError(`Error al cargar el producto: ${err.message}`);
                console.error(err); // Es bueno loguear el error completo
            } finally {
                setLoading(false);
            }
        };

        if (id) { // Asegúrate de que haya un id antes de hacer fetch
            fetchProduct();
        } else {
            setLoading(false);
            setError("ID de producto no proporcionado.");
        }

    }, [id]);

    const addToCart = () => {
        // Evita duplicados, suma cantidad si ya existe
        setCart(prev => {
            const found = prev.find(p => p.id === product.id);
            let updated;
            const cantidadActual = found ? (found.cantidad || 1) : 0;
            if (cantidadActual + 1 > product.stock) {
                alert("No puedes agregar más unidades de este producto. Stock máximo alcanzado.");
                return prev;
            }
            if (found) {
                updated = prev.map(p =>
                    p.id === product.id ? { ...p, cantidad: (p.cantidad || 1) + 1 } : p
                );
            } else {
                updated = [...prev, { ...product, cantidad: 1 }];
            }
            localStorage.setItem('cart', JSON.stringify(updated));
            return updated;
        });
        // Solo navegar si realmente se agregó
        const found = cart.find(p => p.id === product.id);
        const cantidadActual = found ? (found.cantidad || 1) : 0;
        if (cantidadActual < product.stock) {
            alert("Producto agregado al carrito.");
            navigate('/mi-carrito');
        }
    };

    const addStock = () => {
        alert("Stock agregado.");
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    if (!product) {
        return <div>Producto no encontrado.</div>;
    }

    // Ahora el JSX usará los campos mapeados: product.image, product.title, etc.
    return (
        <div className="product-details-container">
            <div className="product-details">
                <div className="product-images">
                    <img src={product.image} alt={product.title} className="product-image" />
                </div>

                <div className="product-info">
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price"><strong>${String(product.price)}</strong></p>

                    <div className="buttons-container">
                        <button className="add-to-cart" onClick={addToCart}>Agregar al carrito</button>
                        {isAdmin && (
                            <button className="add-stock" onClick={addStock}>Agregar Stock</button>
                        )}
                    </div>
                    <button className="back-button" onClick={() => navigate("/")}>Volver a la tienda</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;