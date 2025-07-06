import { Box, Paper, Stack, Typography, Avatar, TextField, Button } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import NuevoNavBar from '../../Components/NuevoNavBar';
import Footer from '../../Components/Footer';


const TusDirecciones = () => {
    const [formData,setFormData] = useState({
        CalleYAltura:'',
        Provincia:'',
        Ciudad:'',
        CodigoPostal:''
    })
    const [loading, setLoading] = useState(false);

    // Obtener token del localStorage
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    useEffect(() => {
        if (!token) {
            alert("No se encontró el token de autenticación");
            return;
        }

        setLoading(true);
        
        fetch("http://localhost:8080/api/users/me", {
            headers: {"Authorization": `Bearer ${token}`}
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
            setFormData({
                CalleYAltura: data.calleYAltura || "",
                Provincia: data.provincia || "",
                Ciudad: data.ciudad || "",
                CodigoPostal: data.codigoPostal || ""
            })
        })
        .catch(() => {
            alert("No se pudo obtener la información de direcciones del usuario")
        })
        .finally(() => setLoading(false));
    }, [token])

    // Función que actualiza el obj de estado formData cada vez que el usuario tipea en los campos de texto...
    const handleChange = (e) => {

        // Extraigo el id y el value del TextField que disparó el evento...
        const { id, value } = e.target;

        // Actualizo el obj formData, manteniendo lo que se haya tipeado anteriormente...
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                calleYAltura: formData.CalleYAltura,
                provincia: formData.Provincia,
                ciudad: formData.Ciudad,
                codigoPostal: formData.CodigoPostal
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
            if (res.ok) {
                alert("¡Información guardada correctamente!");
            } else {
                alert("Error al guardar la información");
            }
        } catch (error) {
            setLoading(false);
            alert(error.message || "Error inesperado");
        }
    }

    const handleClear = () => {
        setFormData({
            CalleYAltura: '',
            Provincia: '',
            Ciudad: '',
            CodigoPostal: ''
        })
    }

  return (
    <>
        <NuevoNavBar/>
        <Box sx={{p:4, display:'flex', flexDirection:'column',  alignItems:'center'}}>
            <Typography variant='h4' gutterBottom>
                Tus Direcciones
            </Typography>

            <Paper elevation={3} name="Paper" sx={{p:3, width:{xs: '95vw', sm: '80vw', md: '60vw', lg: '50vw'}}}>

                <Box sx={{
                    display: 'flex',
                    flexDirection:'row',
                    gap:2,
                    width:'100%',
                    mb:3
                    }}
                    name="HijoDelPaper">

                    <Avatar alt="Foto perfil" sx={{
                        width:140,height:140,bgcolor:'#232F3E'
                        }}>
                        <PersonIcon sx={{width:50,height:50}}/>
                    </Avatar>

                    <Stack spacing={3} sx={{flex: 1}}>
                        
                        <TextField id='CalleYAltura' 
                            label="Calle y Altura" 
                            value={formData.CalleYAltura} 
                            onChange={handleChange}
                            fullWidth 
                        />
                        <TextField id='Provincia' 
                            label="Provincia" 
                            value={formData.Provincia}
                            onChange={handleChange}
                            fullWidth 
                        />
                        <TextField id='Ciudad' 
                            label="Ciudad"
                            value={formData.Ciudad}
                            onChange={handleChange}
                            fullWidth 
                        />
                        <TextField id='CodigoPostal' 
                            label="Código Postal"
                            value={formData.CodigoPostal}
                            onChange={handleChange}
                            sx={{width:'50%'}}
                        />
                    </Stack>
                </Box>
                <Box name="ContenedorBotones"
                    sx={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'center',
                        gap:5
                    }}>

                    <Button variant='contained'
                        startIcon={<DeleteIcon/>}
                        onClick={handleClear}
                        sx={{bgcolor: 'gray !important', color: 'white'}}>
                        Borrar
                    </Button>

                    <Button variant='contained'
                    startIcon={<SaveIcon/>}
                    onClick={handleSubmit}
                    sx={{bgcolor: '#131921 !important', color: 'white'}}>
                        Guardar
                    </Button>
                </Box>
                
                
            </Paper>
        </Box>
        <Footer/>
    </>
  )
}

export default TusDirecciones