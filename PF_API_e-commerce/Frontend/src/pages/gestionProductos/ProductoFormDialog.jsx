import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@mui/material';

// Lista de categorías disponibles
const categoriasDisponibles = [
  'Ropa', 'Electrónica', 'Calzado', 'Libros', 'Hogar', 'Accesorios', 'Muebles', 'Deportes', 'Juguetes', 'Alimentos', 'Otros'
];

function ProductoFormDialog({ open, onClose, onSave, producto, isEditMode }) {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    imagen: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = React.useRef();

  useEffect(() => {
    if (producto) {
      setFormData({
        id: producto.id || undefined,
        // Usamos los nombres que llegan del frontend: title, price, category, image
        nombre: producto.title || '',
        precio: producto.price || '',
        stock: producto.stock || '',
        categoria: producto.category || '',
        imagen: producto.image || ''
      });
      // También corregimos aquí para la vista previa de la imagen
      setSelectedImage(producto.image || '');
      setImagePreview(producto.image || '');
    } else {
      setFormData({ nombre: '', precio: '', stock: '', categoria: '', imagen: '' });
      setSelectedImage('');
      setImagePreview('');
    }
    setFormErrors({});
  }, [producto, open]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFormErrors(prev => ({ ...prev, imagen: 'El archivo debe ser una imagen' }));
        return;
      }

      // Crear URL temporal para la vista previa
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Convertir la imagen a Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setFormData(prev => ({ ...prev, imagen: reader.result }));
      };
      reader.readAsDataURL(file);

      // Limpiar error si existe
      if (formErrors.imagen) {
        setFormErrors(prev => ({ ...prev, imagen: null }));
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es obligatorio.';
    if (!formData.categoria) errors.categoria = 'La categoría es obligatoria.';
    if (!formData.imagen) errors.imagen = 'La imagen es obligatoria.';
    
    const precioNum = parseFloat(formData.precio);
    if (isNaN(precioNum) || precioNum <= 0) errors.precio = 'El precio debe ser un número positivo.';
    
    const stockNum = parseInt(formData.stock, 10);
    if (isNaN(stockNum) || stockNum < 0) errors.stock = 'El stock debe ser un número entero no negativo.';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
        {/* Campo de imagen */}
        <FormControl fullWidth margin="dense" error={!!formErrors.imagen} sx={{ mb: 2 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="imagen-input"
            type="file"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <label htmlFor="imagen-input">
            <Button
              variant="outlined"
              component="span"
              fullWidth
              style={{ height: '56px' }}
            >
              {imagePreview ? 'Cambiar Imagen' : 'Subir Imagen'}
            </Button>
          </label>
          {formErrors.imagen && <FormHelperText>{formErrors.imagen}</FormHelperText>}
        </FormControl>

        {/* Vista previa de la imagen */}
        {imagePreview && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img 
              src={imagePreview} 
              alt="Vista previa" 
              style={{ 
                maxWidth: '200px', 
                maxHeight: '200px', 
                objectFit: 'contain',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '8px'
              }} 
            />
          </div>
        )}
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
