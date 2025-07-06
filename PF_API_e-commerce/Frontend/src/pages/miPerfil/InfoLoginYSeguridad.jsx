import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import andres1 from '../../assets/andres1.jpg'
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import NuevoNavBar from '../../Components/NuevoNavBar';
import Footer from '../../Components/Footer';


const InfoLoginYSeguridad = () => {
    
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        edad: '',
        email: '',
        indicativo: '',
        telefono: ''
    });

    
    const [loading, setLoading] = useState(false);

    // Único uso de localStorage para obtener el token:
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    // Traer los datos del usuario autenticado desde la BD:
    useEffect(() => {
        
        // Se valida que haya un token, sino, mensaje de error:
        if (!token) {
            alert("No se encontró el token de autenticacion");
            return;
        }

        setLoading(true);

        // Fetch al endpoint localhost:8080/api/users/me:
        fetch("http://localhost:8080/api/users/me",{
            headers: {"Authorization": `Bearer ${token}`}
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {

            // Si todo ok, se settean los campos de texto con la info del usuario:
            setFormData({
                nombre: data.nombre || "",
                apellido: data.apellido || "",
                edad: data.edad || "",
                email: data.email || "",
                indicativo: data.indicativo || "",
                telefono: data.telefono || ""
            });
        })
        .catch(() => {
            alert("No se pudo obtener la información del usuario")
        })
        .finally(() => setLoading(false));

    }, [token]); // <--- activa todo de vuelta si cambia el token

    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // Manejo del PATCH para actualizar info del usuario:
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Se valida que haya un token, sino, mensaje de error:
        if (!token) {
            alert("No se encontró el token de autenticación");
            return;
        }

        setLoading(true);

        try {
            // 1. Obtener todos los datos actuales del usuario
            const resGet = await fetch("http://localhost:8080/api/users/me", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!resGet.ok) throw new Error("No se pudo obtener la información actual del usuario");
            const currentData = await resGet.json();

            // 2. Mezclar los datos actuales con los del formulario
            const updatedData = {
                ...currentData,
                nombre: formData.nombre,
                apellido: formData.apellido,
                edad: formData.edad,
                email: formData.email,
                indicativo: formData.indicativo,
                telefono: formData.telefono
            };

            // 3. Enviar el objeto completo al backend
            const res = await fetch("http://localhost:8080/api/users/me", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

            setLoading(false);

            // Se valida el correcto guardado de la info:
            if (res.ok) {
                alert("¡Información guardada correctamente!");
            } else {
                let errorMsg = "Error al guardar la información";
                try {
                    const errorData = await res.json();
                    if (errorData && errorData.message) {
                        errorMsg = errorData.message;
                    }
                } catch (e) {}
                alert(errorMsg);
            }
        } catch (error) {
            setLoading(false);
            alert(error.message || "Error inesperado");
        }
    };

    const handleClear = () => {
        localStorage.removeItem("user")
        setFormData({
            nombre: '',
            apellido: '',
            edad: '',
            email: '',
            indicativo: '',
            telefono: ''
        })
    }

  return (
    <>
        <NuevoNavBar/>
        
        <Container maxWidth="lg" 
            sx={{
                // border: '3px solid blue', 
                height: '100vh',
                display: 'flex',
                justifyContent: 'center'
            }}>
            

            {/* Box Padre */}
            <Box sx={{
                border: '1px solid gray',
                borderRadius: '8px',
                boxShadow: 3,
                width: '70%',
                my: 2,
                height: 'calc(100vh - 32px)', // Ajusta el alto del Box Padre
                display: 'flex',
                flexDirection: 'column',
                }}>

                {/* Box interno de cabecera */}
                <Box sx={{                
                    width: '100%',
                    minHeight: '90px',
                    paddingLeft: '15px',
                    paddingTop: '12px'
                    }}>

                    <Typography 
                        variant='h4'
                        component={'h2'} 
                        sx={{
                            fontFamily: 'Inter, sans-serif'
                        }}>
                        Login y Seguridad
                    </Typography>
                    <Typography 
                        variant='body2'
                        component={'p'}
                        sx={{
                            fontFamily: 'Inter, sans-serif',
                            marginTop: '8px',
                        }}>
                        Edita tu información personal y de login
                    </Typography>
                </Box>

                {/* Box interno de contenido */}
                <Box sx={{
                    borderTop: '1px solid gray',
                    width: '100%',
                    display: 'flex',
                    flex: 1, // Ocupa todo el espacio vertical restante
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    minHeight: 0, // Permite que los hijos usen height: 100%
                    }}>
                        
                    {/* Box Avatar */}
                    <Box sx={{
                        // border: '1px solid red',
                        width: '200px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: '20px',
                        minHeight: 0,
                        }}>

                        <Avatar 
                            alt='Foto Perfil'
                            src={andres1}
                            fontSize='large'
                            sx={{
                                width: '140px',
                                height: '140px'
                            }}>
                            AM
                        </Avatar>
                    </Box>

                    {/* Box Formulario */}
                    <Box component="form" onSubmit={handleSubmit}
                        sx={{
                        // border: '3px solid purple',
                        flex: 1, // Ocupa el resto del ancho
                        height: '100%',
                        display: 'flex',
                        flexGrow: 1,
                        flexDirection: 'column',
                        minHeight: 0,
                        }}>
                        
                        {/* Box NombreApellido */}
                        <Box sx={{
                            // border: '3px solid green',
                            width: '100%',
                            height: '100px',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                            padding: '20px',
                            }}>

                            <TextField 
                                id='nombre' 
                                label="Nombre" 
                                variant="outlined" 
                                sx={{ width: { xs: '100%', sm: '250px' } }}
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                            <TextField 
                                id='apellido' 
                                label="Apellido" 
                                variant="outlined" 
                                sx={{ width: { xs: '100%', sm: '250px' } }}
                                value={formData.apellido}
                                onChange={handleChange}
                            />
                        </Box>
                        
                        {/* Box EdadEmail */}
                        <Box sx={{
                            // border: '3px solid green',
                            width: '100%',
                            height: '100px',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                            padding: '20px',
                            }}>

                            <TextField 
                                id='edad' 
                                label="Edad" 
                                variant="outlined"
                                type='number' 
                                sx={{ width: { xs: '100%', sm: '100px' } }}
                                value={formData.edad}
                                onChange={handleChange}
                            />
                            <TextField 
                                id='email' 
                                label="Email" 
                                variant="outlined"
                                type='email'
                                helperText="ejemplo@dominioMail.com" 
                                sx={{ width: { xs: '100%', sm: '73%' } }}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Box>

                        {/* Box IndicativoTelefono */}
                        <Box sx={{
                            // border: '3px solid green',
                            width: '100%',
                            height: '100px',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                            padding: '20px'
                            }}>

                            <TextField 
                                id='indicativo' 
                                label="Indicativo" 
                                variant="outlined"
                                type='number' 
                                sx={{ width: { xs: '100%', sm: '100px' } }}
                                value={formData.indicativo}
                                onChange={handleChange}
                            />
                            <TextField 
                                id='telefono' 
                                label="Teléfono" 
                                variant="outlined"
                                type='number' 
                                sx={{ width: { xs: '100%', sm: '73%' } }}
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                        </Box>
                        
                        {/* Box Boton */}
                        <Box sx={{
                            // border: '3px solid green',
                            width: '100%',
                            height: '100px',
                            display: 'flex',
                            flexDirection: 'row',
                            padding: '20px',
                            justifyContent: 'center',
                            gap:'30px'
                        }}>
                            <Button variant="contained" 
                                startIcon={<DeleteIcon/>} 
                                color="primary"
                                onClick={handleClear}
                                sx={{bgcolor: 'gray !important', color: 'white',width: '200px'}}>
                                Borrar Info
                            </Button>
                            <Button variant="contained" 
                                startIcon={<SaveIcon/>} 
                                type='submit'
                                color="primary"
                                sx={{bgcolor: '#131921 !important', color: 'white',width: '200px'}}>
                                Guardar Info
                            </Button>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Container>
        <Footer />
    </>
  )
}

export default InfoLoginYSeguridad