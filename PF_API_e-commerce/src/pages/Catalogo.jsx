import React from 'react';
import {
  Typography,
  Box
} from '@mui/material';
import './CatalogoStyles.css';

const productos = [
  {
    nombre: 'Camiseta Amazonas',
    precio: 1200,
    imagen: '/img/camisetaNike.jpg',
  },
  {
    nombre: 'Auriculares Bluetooth',
    precio: 3500,
    imagen: '/img/auricularesBeats.jpg',
  },
  {
    nombre: 'Zapatillas Running',
    precio: 5800,
    imagen: '/img/zapatillasRunning.jpg',
  },
  {
    nombre: 'Camiseta Amazonas',
    precio: 1200,
    imagen: '/img/camisetaNike.jpg',
  },
  {
    nombre: 'Camiseta Amazonas',
    precio: 1200,
    imagen: '/img/camisetaNike.jpg',
  },
  {
    nombre: 'Camiseta Amazonas',
    precio: 1200,
    imagen: '/img/camisetaNike.jpg',
  },
  {
    nombre: 'Camiseta Amazonas',
    precio: 1200,
    imagen: '/img/camisetaNike.jpg',
  },
  {
    nombre: 'Camiseta Amazonas',
    precio: 1200,
    imagen: '/img/camisetaNike.jpg',
  },
];

export default function Catalogo() {
  return (
    <Box sx={{ width: '100%', py: 4 }} className="catalogo-container">
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', px: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          color="primary"
          className="catalogo-title"
        >
          Catálogo de Productos
        </Typography>
        <div className="producto-grid"> {/* Usamos un div con la clase para el grid */}
          {productos.map((producto, index) => (
            <div key={index} className="producto-card"> {/* Cada producto dentro de una tarjeta */}
              <div className="producto-imagen-container">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="producto-imagen"
                />
              </div>
              <div className="producto-info">
                <Typography variant="h6" className="producto-nombre">{producto.nombre}</Typography>
                <Typography variant="body2" color="text.secondary" className="producto-precio">
                  ${producto.precio}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Box>
  );
}