import React from 'react';
import {
  Box, Typography, Grid, Card, CardMedia, CardContent, Button, CardActions
} from '@mui/material';
import './catalogoStyles.css';

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
    nombre: 'Teclado Mecánico RGB',
    precio: 4800,
    imagen: '/img/tecladoRGB.jpg',
  },
  {
    nombre: 'Libro "El Código Da Vinci"',
    precio: 1500,
    imagen: '/img/libroCodigoDaVinci.jpg',
  },
  {
    nombre: 'Cafetera Express',
    precio: 6700,
    imagen: '/img/CafeteraExpress.jpg',
  },
  {
    nombre: 'Monitor Curvo 27"',
    precio: 15000,
    imagen: '/img/monitorCurvo.jpg',
  },
  {
    nombre: 'Mochila Urbana',
    precio: 1700,
    imagen: '/img/MochilaUrbana.jpg',
  },
  {
    nombre: 'reloj inteligente',
    precio: 7200,
    imagen: '/img/SmartwatchDeportivoGPS.jpg',
  },
  {
    nombre: 'Silla Gamer Ergonómica',
    precio: 9500,
    imagen: '/img/SillaGamerErgonomica.jpg',
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}>
          <Button variant="contained" color="primary" onClick={() => alert('Filtrar por categorías')}>
            Filtrar por Categorías
          </Button>
        </Box>
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