import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TablePagination, Chip
} from '@mui/material';
// Importa iconos de Material UI
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './gestionProductosStyles.css'; // Importa los estilos CSS

function GestionProductos() {
  const [productos, setProductos] = useState([
     { id: 1, nombre: 'Camiseta Amazonas', precio: 1200, stock: 50, categoria: 'Ropa' },
    { id: 2, nombre: 'Auriculares Bluetooth', precio: 3500, stock: 25, categoria: 'Electrónica' },
    { id: 3, nombre: 'Zapatillas Running', precio: 5800, stock: 100, categoria: 'Calzado' },
    { id: 4, nombre: 'Teclado Mecánico RGB', precio: 4200, stock: 15, categoria: 'Electrónica' },
    { id: 5, nombre: 'Libro "El Código Da Vinci"', precio: 1500, stock: 8, categoria: 'Libros' },
    { id: 6, nombre: 'Monitor Curvo 27"', precio: 15000, stock: 0, categoria: 'Electrónica'},
    { id: 7, nombre: 'Cafetera Express', precio: 6700, stock: 30, categoria: 'Hogar'},
    { id: 8, nombre: 'Mochila Urbana', precio: 2800, stock: 60, categoria: 'Accesorios'},
    { id: 9, nombre: 'Silla Gamer Ergonómica', precio: 9500, stock: 12, categoria: 'Muebles'},
    { id: 10, nombre: 'Smartwatch Deportivo GPS', precio: 7200, stock: 40, categoria: 'Electrónica'},
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productos.length) : 0;
  const currentRows = productos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const getStockChip = (stock) => {
      let level = 'high';
      let className = 'high';
      if (stock === 0) {
          level = 'Agotado';
          className = 'low';
      } else if (stock <= 10) {
          level = 'Bajo';
          className = 'low';
      } else if (stock <= 50) {
          level = 'Medio';
           className = 'medium';
      } else {
          level = 'Alto';
      }
      // Asegúrate que las clases CSS .stockChip, .high, .medium, .low existan en gestionProductosStyles.css
      return <Chip label={`${stock} - ${level}`} className={`stockChip ${className}`} size="small" />;
  };

  return (
    <Box component="main" className="gestionProductosContainer">
      <Paper elevation={0} className="gestionProductosPaper">
        <Box className="gestionProductosHeader">
             <Typography variant="h5" component="h1" className="gestionProductosTitle">
               Gestión de Productos
             </Typography>
             <Button
                variant="contained"
                className="addButton"
                startIcon={<AddCircleOutlineIcon />}
              >
                Añadir Producto
              </Button>
        </Box>

        <TableContainer className="gestionProductosTableContainer">
          <Table stickyHeader aria-label="Tabla de gestión de productos">
            <TableHead>
              <TableRow>
                <TableCell className="tableHeadCell">Nombre</TableCell>
                <TableCell className="tableHeadCell">Categoría</TableCell>
                <TableCell className="tableHeadCell" align="right">Precio</TableCell>
                <TableCell className="tableHeadCell" align="center">Stock</TableCell>
                <TableCell className="tableHeadCell" align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((prod) => (
                <TableRow key={prod.id} hover className="tableRow">
                  <TableCell component="th" scope="row" className="tableBodyCell">
                    {prod.nombre}
                  </TableCell>
                  <TableCell className="tableBodyCell">{prod.categoria}</TableCell>
                  <TableCell className="tableBodyCell" align="right">
                    ${prod.precio.toLocaleString('es-AR')}
                  </TableCell>
                  <TableCell className="tableBodyCell" align="center">
                    {getStockChip(prod.stock)}
                  </TableCell>
                  <TableCell className="tableBodyCell" align="center">
                    <Button
                      variant="contained"
                      size="small"
                      className="actionButton editButton"
                      startIcon={<EditIcon sx={{ fontSize: 16 }}/>}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      className="actionButton deleteButton"
                      startIcon={<DeleteIcon sx={{ fontSize: 16 }}/>}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
               {emptyRows > 0 && (
                <TableRow style={{ height: 69 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          className="tablePagination"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={productos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>
    </Box>
  );
}

export default GestionProductos;
