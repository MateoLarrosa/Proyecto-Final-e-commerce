import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TablePagination, Chip,
  CircularProgress, Alert, TextField, InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import './gestionProductosStyles.css';
import NuevoNavBar from '../../Components/NuevoNavBar';
import Footer from '../../Components/Footer';
import ProductoFormDialog from './ProductoFormDialog';

const API_URL = 'http://localhost:3001/api/productos/gestion';

function GestionProductos() {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [productoActual, setProductoActual] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Obtener el usuario actual del localStorage una sola vez al montar el componente
  const currentUser = React.useMemo(() => {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    try {
      return JSON.parse(userString);
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      return null;
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  // Función para obtener productos de la API
  const fetchProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Obtener el usuario y token más actualizados de localStorage
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      const token = user?.token;
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(API_URL, { headers });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data = await response.json();
      // Ordenar los productos por nombre
      const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
      setProductos(sortedData);
      setFilteredProductos(sortedData);
    } catch (err) {
      setError(`Error al cargar productos: ${err.message}`);
      setProductos([]);
      setFilteredProductos([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []); // Sin dependencias para que siempre lea el usuario actualizado

  // Cargar productos solo cuando cambie el ID del usuario
  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  // Función para filtrar productos
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setPage(0); // Resetear la página al buscar
    
    if (!term.trim()) {
      setFilteredProductos(productos);
      return;
    }

    const filtered = productos.filter(producto => 
      producto.title.toLowerCase().includes(term) ||
      producto.category.toLowerCase().includes(term)
    );
    setFilteredProductos(filtered);
  };

  // Actualizar productos filtrados cuando cambian los productos
  useEffect(() => {
    setFilteredProductos(productos);
  }, [productos]);

  // Manejadores de paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Modificar la lógica de paginación para usar productos filtrados
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredProductos.length) : 0;
  const currentRows = filteredProductos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Función getStockChip (sin cambios)
  const getStockChip = (stock) => {
    let level = 'Alto';
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
    }
    return <Chip label={`${stock} - ${level}`} className={`stockChip ${className}`} size="small" />;
  };

  // --- Manejadores para CRUD ---

  const handleOpenAddDialog = () => {
    setProductoActual({ nombre: '', precio: '', stock: '', categoria: '' });
    setIsEditMode(false);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (producto) => {
    setProductoActual(producto);
    setIsEditMode(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProductoActual(null);
  };

  const handleSaveProducto = async (productoData) => {
    if (!currentUser) {
      setError('No hay usuario autenticado');
      return;
    }

    setLoading(true);
    setError(null);
    const method = isEditMode ? 'PUT' : 'POST';
    const url = isEditMode ? `${API_URL}/${productoData.id}` : API_URL;

    // Agregar el userId al producto
    const dataToSend = {
      ...productoData,
      userId: currentUser.id,
      precio: parseFloat(productoData.precio),
      stock: parseInt(productoData.stock, 10),
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }
      await fetchProductos();
      handleCloseDialog();
    } catch (err) {
      setError(`Error al guardar producto: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProducto = async (id) => {
  if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;

  setLoading(true);
  setError(null);

  try {
    // Obtener token del usuario autenticado
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const token = user?.token;

    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    await fetchProductos();
  } catch (err) {
    setError(`Error al eliminar producto: ${err.message}`);
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <NuevoNavBar />
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
              onClick={handleOpenAddDialog}
              disabled={loading}
            >
              Añadir Producto
            </Button>
          </Box>

          {/* Campo de búsqueda */}
          <Box sx={{ mb: 2, mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar por nombre o categoría..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {loading && !filteredProductos.length && ( // Mostrar spinner solo si no hay productos y está cargando inicialmente
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          )}

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
                      {prod.title}
                    </TableCell>
                    <TableCell className="tableBodyCell">{prod.category}</TableCell>
                    <TableCell className="tableBodyCell" align="right">
                      ${typeof prod.price === 'number' ? prod.price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                    </TableCell>
                    <TableCell className="tableBodyCell" align="center">
                      {getStockChip(prod.stock)}
                    </TableCell>
                    <TableCell className="tableBodyCell" align="center">
                      <Button
                        variant="contained"
                        size="small"
                        className="actionButton editButton"
                        startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                        onClick={() => handleOpenEditDialog(prod)}
                        disabled={loading}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        className="actionButton deleteButton"
                        startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
                        onClick={() => handleDeleteProducto(prod.id)}
                        disabled={loading}
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
                {!loading && !filteredProductos.length && !error && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      {searchTerm 
                        ? 'No se encontraron productos que coincidan con la búsqueda.'
                        : 'No hay productos para mostrar. Intenta añadir alguno.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            className="tablePagination"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredProductos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        </Paper>
      </Box>
      <Footer />

      {/* Diálogo para añadir/editar producto */}
      {openDialog && (
        <ProductoFormDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onSave={handleSaveProducto}
          producto={productoActual}
          isEditMode={isEditMode}
        />
      )}
    </>
  );
}

export default GestionProductos;