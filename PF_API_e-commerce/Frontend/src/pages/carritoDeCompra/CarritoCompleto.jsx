import React, { useState, useEffect } from 'react';
import ProductoCarrito from './ProductoCarrito';
import ResumenCarrito from './ResumenCarrito';
import crocsImg from '../../assets/crocs.jpg';
import zapatillasImg from '../../assets/slidesNike.jpg';
import styles from './carritoCompletoStyles.module.css';
import { useNavigate } from 'react-router-dom';
import NuevoNavBar from '../../Components/NuevoNavBar';
import Footer from '../../Components/Footer';

const CarritoCompleto = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem('cart');
      setProductos(stored ? JSON.parse(stored) : []);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const total = productos.reduce((sum, p) => sum + (p.price * (p.cantidad || 1)), 0);

  const actualizarCantidad = (id, nuevaCantidad) => {
    let actualizados;
    if (nuevaCantidad === 0) {
      actualizados = productos.filter(p => p.id !== id);
    } else {
      actualizados = productos.map(p =>
        p.id === id ? { ...p, cantidad: nuevaCantidad } : p
      );
    }
    setProductos(actualizados);
    localStorage.setItem('cart', JSON.stringify(actualizados));
    // Forzar actualización en otras pestañas
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <>
      <NuevoNavBar />
      <div className={styles.carritoPage}>
        <h1>Tu Carrito</h1>
        <div className={styles.container}>
          <div className={styles.productosList}>
            {productos.map((p) => (
              <ProductoCarrito
                key={p.id}
                producto={p}
                onSubtotalChange={actualizarCantidad}
              />
            ))}
          </div>
          <ResumenCarrito total={total} productos={productos} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CarritoCompleto;
