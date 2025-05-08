import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  TextField, Button, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

// Lista de categorías (podría venir de una API o ser configurable)
const categoriasDisponibles = [
  'Ropa', 'Electrónica', 'Calzado', 'Libros', 'Hogar', 'Accesorios', 'Muebles', 'Deportes', 'Juguetes', 'Alimentos', 'Otros'
];

function ProductoFormDialog({ open, onClose, onSave, producto, isEditMode }) {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    // Podrías añadir más campos como descripción, imagenURL, etc.
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (producto) {
      setFormData({
        id: producto.id || undefined, // Incluir id si existe (para edición)
        nombre: producto.nombre || '',
        precio: producto.precio || '',
        stock: producto.stock || '',
        categoria: producto.categoria || '',
      });
    } else {
      // Resetear para el modo "Añadir"
      setFormData({ nombre: '', precio: '', stock: '', categoria: '' });
    }
    setFormErrors({}); // Limpiar errores al abrir/cambiar producto
  }, [producto, open]); // Se ejecuta cuando el producto o el estado 'open' cambian

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error para el campo que se está modificando
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es obligatorio.';
    if (!formData.categoria) errors.categoria = 'La categoría es obligatoria.';
    
    const precioNum = parseFloat(formData.precio);
    if (isNaN(precioNum) || precioNum <= 0) errors.precio = 'El precio debe ser un número positivo.';
    
    const stockNum = parseInt(formData.stock, 10);
    if (isNaN(stockNum) || stockNum < 0) errors.stock = 'El stock debe ser un número entero no negativo.';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Retorna true si no hay errores
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Editar Producto' : 'Añadir Nuevo Producto'}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          {isEditMode ? 'Modifica los detalles del producto.' : 'Completa los campos para agregar un nuevo producto.'}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="nombre"
          label="Nombre del Producto"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.nombre}
          onChange={handleChange}
          error={!!formErrors.nombre}
          helperText={formErrors.nombre}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth margin="dense" error={!!formErrors.categoria} sx={{ mb: 2 }}>
          <InputLabel id="categoria-label">Categoría</InputLabel>
          <Select
            labelId="categoria-label"
            name="categoria"
            value={formData.categoria}
            label="Categoría"
            onChange={handleChange}
            variant="outlined"
          >
            {categoriasDisponibles.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
          {formErrors.categoria && <DialogContentText color="error" sx={{ml: 1.5, mt: 0.5, fontSize: '0.75rem'}}>{formErrors.categoria}</DialogContentText>}
        </FormControl>
        <TextField
          margin="dense"
          name="precio"
          label="Precio (ej: 1200.50)"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.precio}
          onChange={handleChange}
          error={!!formErrors.precio}
          helperText={formErrors.precio}
          InputProps={{ inputProps: { min: 0, step: "0.01" } }}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          name="stock"
          label="Stock Disponible"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.stock}
          onChange={handleChange}
          error={!!formErrors.stock}
          helperText={formErrors.stock}
          InputProps={{ inputProps: { min: 0, step: "1" } }}
        />
      </DialogContent>
      <DialogActions sx={{ p: '16px 24px' }}>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditMode ? 'Guardar Cambios' : 'Añadir Producto'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductoFormDialog;
