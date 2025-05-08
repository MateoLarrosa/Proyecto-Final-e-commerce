import React, { useState } from 'react';
import Producto from './ProductoCarrito';
import ResumenCarrito from './ResumenCarrito';
import crocsImg from '../../assets/crocs.jpg';
import zapatillasImg from '../../assets/slidesNike.jpg';
import styles from '../carritoDeCompra/carritoCompletoStyles.module.css';
import NavBar  from '../../Components/NavBar';
import Footer from '../../Components/Footer';



const CarritoCompleto = () => {
  // Datos de productos SIN cantidad inicial
  const productos = [
    { id: 1, name: "Crocs Zuecos", price: 14.35, imagen: crocsImg },
    { id: 2, name: "Nike Benassi Solarsoft - Sandalias deportivas para hombre", price: 50.00, imagen: zapatillasImg }
  ];

  // Estado para guardar solo los subtotales por ID
  const [subtotales, setSubtotales] = useState(
    productos.reduce((acc, p) => ({ ...acc, [p.id]: p.price }), {})
  );

  // Calcula el total sumando todos los subtotales
  const total = Object.values(subtotales).reduce((sum, st) => sum + st, 0);

  // Actualiza el subtotal cuando un producto cambia
  const handleSubtotalChange = (productoId, nuevoSubtotal) => {
    setSubtotales(prev => ({ ...prev, [productoId]: nuevoSubtotal }));
  };

  return (

  
    <div className={styles.carritoPage}>
      <NavBar></NavBar>
      <h1>Tu Carrito</h1>

        <div className={styles.container}>
            <div className={styles.productosList}>
                {productos.map(p => (
                <Producto
                key={p.id}
                 producto={p} // Prop 1: Datos del producto
                onSubtotalChange={handleSubtotalChange} // Prop 2: Callback
                />
                ))}
        
            </div>
            <ResumenCarrito total={total} />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CarritoCompleto;