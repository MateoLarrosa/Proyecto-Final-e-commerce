import React, { useState } from 'react';
import ProductoCarrito from './ProductoCarrito';
import ResumenCarrito from './ResumenCarrito';
import crocsImg from '../../assets/crocs.jpg';
import zapatillasImg from '../../assets/slidesNike.jpg';
import styles from './carritoCompletoStyles.module.css';
import NuevoNavBar from '../../Components/NuevoNavBar';
import Footer from '../../Components/Footer';

const CarritoCompleto = () => {
  const productosIniciales = [
    { id: 1, name: "Crocs Zuecos", price: 14.35, imagen: crocsImg, cantidad: 1 },
    { id: 2, name: "Nike Benassi Solarsoft", price: 50.00, imagen: zapatillasImg, cantidad: 1 }
  ];

  const [productos, setProductos] = useState(productosIniciales);

  const total = productos.reduce((sum, p) => sum + (p.price * p.cantidad), 0);

  const actualizarCantidad = (id, nuevaCantidad) => {
    setProductos(prev =>
      prev.map(p =>
        p.id === id ? { ...p, cantidad: nuevaCantidad } : p
      )
    );
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
        <ResumenCarrito total={total} />
      </div>
      <Footer />
    </div>
    </>
  );
};

export default CarritoCompleto;
