import React from 'react';
import styles from './productoCarritoStyles.module.css';

const ProductoCarrito = ({ producto, onSubtotalChange }) => {
  const subtotal = producto.price * producto.cantidad;

  const aumentarCantidad = () => {
    if (producto.cantidad < producto.stock) {
      onSubtotalChange(producto.id, producto.cantidad + 1);
    }
  };

  const disminuirCantidad = () => {
    if (producto.cantidad > 1) {
      onSubtotalChange(producto.id, producto.cantidad - 1);
    } else if (producto.cantidad === 1) {
      if (window.confirm('¿Deseas eliminar este producto del carrito?')) {
        onSubtotalChange(producto.id, 0);
      }
    }
  };

  // Compatibilidad: usa producto.imagen o producto.image
  const imagenSrc = producto.imagen || producto.image;

  return (
    <div className={styles.cartContainer + ' ' + styles.cartCardMini}>
      <div className={styles.divImg}>
        <img src={imagenSrc} alt={producto.name || producto.title} style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain' }} />
      </div>
      <div className={styles.productDetails}>
        <h2 style={{ fontSize: '1.2rem' }}>{producto.name || producto.title}</h2>
        <p style={{ fontSize: '1rem' }}><strong>Precio unitario:</strong> ${producto.price.toFixed(2)}</p>
        <div className={styles.quantityControl}>
          <button onClick={disminuirCantidad}>-</button>
          <span>{producto.cantidad}</span>
          <button 
            onClick={producto.cantidad < producto.stock ? aumentarCantidad : undefined}
            disabled={producto.cantidad >= producto.stock}
            style={{ color: producto.cantidad >= producto.stock ? '#bbb' : 'black', cursor: producto.cantidad >= producto.stock ? 'not-allowed' : 'pointer' }}
          >
            +
          </button>
        </div>
        <p style={{ fontSize: '1rem' }}><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductoCarrito;
