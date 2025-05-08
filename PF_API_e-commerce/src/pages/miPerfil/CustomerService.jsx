import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper
} from '@mui/material';
import NuevoNavBar from '../../Components/NuevoNavBar';
import Footer from '../../Components/Footer';

const ContactForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    pedido: '',
    tipo: '',
    mensaje: '',
  });

  const [errores, setErrores] = useState({});

  const tiposDeProblema = [
    'Producto defectuoso',
    'Envío retrasado',
    'Error en el pedido',
    'Otro',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = 'Nombre requerido';
    if (!form.email.includes('@')) nuevosErrores.email = 'Email inválido';
    if (!form.pedido.trim()) nuevosErrores.pedido = 'Número de pedido requerido';
    if (!form.tipo) nuevosErrores.tipo = 'Seleccioná un tipo de problema';
    if (form.mensaje.length < 10)
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      // Aquí podrías enviar los datos por fetch o axios
      console.log('Formulario enviado:', form);
      alert('Gracias por tu mensaje. Lo revisaremos a la brevedad.');
      setForm({ nombre: '', email: '', pedido: '', tipo: '', mensaje: '' });
      setErrores({});
    }
  };

  return (
    <>
        <NuevoNavBar/>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, margin: 'auto' }}>
        <Typography variant="h5" gutterBottom>
            Formulario de contacto
        </Typography>
        <Typography variant="body2" gutterBottom>
            Si tuviste un problema con tu compra, por favor completá este formulario.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            error={!!errores.nombre}
            helperText={errores.nombre}
            />
            <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={!!errores.email}
            helperText={errores.email}
            />
            <TextField
            label="Número de pedido"
            name="pedido"
            value={form.pedido}
            onChange={handleChange}
            error={!!errores.pedido}
            helperText={errores.pedido}
            />
            <TextField
            label="Tipo de problema"
            name="tipo"
            select
            value={form.tipo}
            onChange={handleChange}
            error={!!errores.tipo}
            helperText={errores.tipo}
            >
            {tiposDeProblema.map((opcion) => (
                <MenuItem key={opcion} value={opcion}>
                {opcion}
                </MenuItem>
            ))}
            </TextField>
            <TextField
            label="¿Qué ocurrió?"
            name="mensaje"
            multiline
            minRows={4}
            value={form.mensaje}
            onChange={handleChange}
            error={!!errores.mensaje}
            helperText={errores.mensaje}
            />
            <Button variant="contained" color="primary" type="submit">
            Enviar mensaje
            </Button>
        </Box>
        </Paper>
        <Footer/>
    </>
  );
};

export default ContactForm;
