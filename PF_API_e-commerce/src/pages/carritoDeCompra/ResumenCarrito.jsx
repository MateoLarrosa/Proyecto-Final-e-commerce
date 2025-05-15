import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './resumenCarritoStyles.module.css';

const API_URL = "http://localhost:3001/productos";

const ResumenCarrito = ({ total, productos = [] }) => {
  const navigate = useNavigate();

  const actualizarStock = async () => {
    try {
      // Para cada producto en el carrito
      for (const producto of productos) {
        // Obtener el producto actual de la base de datos
        const response = await fetch(`${API_URL}/${producto.id}`);
        if (!response.ok) throw new Error(`Error al obtener producto ${producto.id}`);
        const productoActual = await response.json();

        // Calcular nuevo stock
        const nuevoStock = productoActual.stock - producto.cantidad;

        // Actualizar el producto con el nuevo stock
        const updateResponse = await fetch(`${API_URL}/${producto.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stock: nuevoStock
          })
        });

        if (!updateResponse.ok) throw new Error(`Error al actualizar stock del producto ${producto.id}`);
      }
      return true;
    } catch (error) {
      console.error('Error al actualizar stock:', error);
      return false;
    }
  };

  const handleProcederPago = async () => {
    // Verificar si hay productos en el carrito
    if (productos.length === 0) {
      alert('No hay productos en el carrito');
      return;
    }

    // Verificar si el usuario está logueado
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Debes iniciar sesión para realizar la compra');
      navigate('/login-user');
      return;
    }

    // Verificar stock disponible antes de proceder
    const stockInsuficiente = productos.find(p => p.cantidad > p.stock);
    if (stockInsuficiente) {
      alert(`No hay suficiente stock disponible para ${stockInsuficiente.title || stockInsuficiente.nombre}`);
      return;
    }

    // Si todo está bien, procedemos con el pago
    if (confirm('¿Deseas confirmar tu compra por ARS$' + total.toFixed(2) + '?')) {
      // Actualizar stock
      const stockActualizado = await actualizarStock();
      
      if (!stockActualizado) {
        alert('Hubo un error al procesar tu compra. Por favor, intenta nuevamente.');
        return;
      }

      alert('¡Gracias por tu compra!');
      // Limpiar el carrito
      localStorage.setItem('cart', '[]');
      // Forzar actualización en otras pestañas
      window.dispatchEvent(new Event('storage'));
      // Redirigir al home
      navigate('/');
    }
  };

  return (
    <div className={styles.resumenContainer}>
      <div className={styles.resumenContent}>
        <h3>Total: <span className={styles.totalAmount}>ARS${total.toFixed(2)}</span></h3>
        <button 
          className={styles.procederPagoBtn}
          onClick={handleProcederPago}
        >
          Proceder al pago
        </button>
      </div>
    </div>
  );
};

export default ResumenCarrito;
