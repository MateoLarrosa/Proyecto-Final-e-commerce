import React, { useState } from "react";
import  styles from './productoCarritoStyles.module.css';


const Producto = ({ producto, onSubtotalChange }) => {
    
    const [cantidad, setCantidad] = useState(1);
    const precio = producto.price;
    const subtotal = (precio * cantidad); // Calcula el subtotal en tiempo real
  
    const sumarCantidad = () => {
        const nuevaCantidad = cantidad + 1;
        setCantidad(nuevaCantidad);
        onSubtotalChange(producto.id, precio * nuevaCantidad);
    };
      
    const restarCantidad = () => {
        if (cantidad > 1) {
            const nuevaCantidad = cantidad - 1;
            setCantidad(nuevaCantidad);
            onSubtotalChange(producto.id, precio * nuevaCantidad);
        }
    };
  
    return (
        <div className={styles.cartContainer}>
            <div className={styles.divImg}>
                <img src={producto.imagen } alt={producto.name} />
            </div>
            <div className={styles.productDetails}>
                <h2>{producto.name}</h2>
                <p><strong>Precio unitario:</strong> ${precio.toFixed(2)}</p>
                
                <div className={styles.quantityControl}>
                    <button onClick={restarCantidad}>-</button>
                    <span>{cantidad}</span>
                    <button onClick={sumarCantidad}>+</button>
                </div>
                
                <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Producto;