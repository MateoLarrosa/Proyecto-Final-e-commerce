import React from 'react';
import styles from './productoCarritoStyles.module.css';

const ProductoCarrito = ({ producto, onSubtotalChange }) => {
  const subtotal = producto.price * producto.cantidad;

  const aumentarCantidad = () => {
    onSubtotalChange(producto.id, producto.cantidad + 1);
  };

  const disminuirCantidad = () => {
    if (producto.cantidad > 1) {
      onSubtotalChange(producto.id, producto.cantidad - 1);
    }
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.divImg}>
        <img src={producto.imagen} alt={producto.name} />
      </div>
      <div className={styles.productDetails}>
        <h2>{producto.name}</h2>
        <p><strong>Precio unitario:</strong> ${producto.price.toFixed(2)}</p>

        <div className={styles.quantityControl}>
          <button onClick={disminuirCantidad}>-</button>
          <span>{producto.cantidad}</span>
          <button onClick={aumentarCantidad}>+</button>
        </div>

        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductoCarrito;
