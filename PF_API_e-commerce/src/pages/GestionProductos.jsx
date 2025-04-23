import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography
} from '@mui/material';
import './GestionProductosStyles.css'; // Importa los estilos locales

const productos = [
  { id: 1, nombre: 'Camiseta Amazonas', precio: '$1200' },
  { id: 2, nombre: 'Auriculares Bluetooth', precio: '$3500' },
  { id: 3, nombre: 'Zapatillas Running', precio: '$5800' },
];

export default function GestionProductos() {
  return (
    <div className="gestion-productos-container"> {/* Contenedor principal con clase */}
      <Typography variant="h5" className="gestion-productos-title"> {/* Título con clase */}
        Gestión de Productos
      </Typography>
      <TableContainer component={Paper} className="gestion-productos-table-container"> {/* Contenedor de la tabla con clase */}
        <Table className="gestion-productos-table"> {/* Tabla con clase */}
          <TableHead>
            <TableRow>
              <TableCell className="table-header-cell">Nombre</TableCell> {/* Encabezado con clase */}
              <TableCell className="table-header-cell">Precio</TableCell> {/* Encabezado con clase */}
              <TableCell align="center" className="table-header-cell">Acciones</TableCell> {/* Encabezado con clase */}
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell className="table-body-cell">{prod.nombre}</TableCell> {/* Celda del cuerpo con clase */}
                <TableCell className="table-body-cell">{prod.precio}</TableCell> {/* Celda del cuerpo con clase */}
                <TableCell align="center" className="table-body-cell"> {/* Celda del cuerpo con clase */}
                  <Button variant="contained" color="primary" size="small" sx={{ marginRight: 1 }} className="edit-button"> {/* Botón editar con clase */}
                    Editar
                  </Button>
                  <Button variant="contained" color="error" size="small" className="delete-button"> {/* Botón eliminar con clase */}
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}