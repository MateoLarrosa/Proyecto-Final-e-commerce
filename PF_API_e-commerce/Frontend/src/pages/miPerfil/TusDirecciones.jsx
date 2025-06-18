import { Box, Paper, Stack, Typography, Avatar, TextField, Button } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import NuevoNavBar from '../../Components/NuevoNavBar';
import Footer from '../../Components/Footer';


const TusDirecciones = () => {

    // Creo un useState para controlar los inputs del formulario...
    const [formData,setFormData] = useState({
        CalleYAltura:'',
        Provincia:'',
        Ciudad:'',
        CodigoPostal:''
    })

    // Creo un useEffect para traer info del usuario logueado al formulario cuando carga el componente por primera vez...
    useEffect(() => {

        // Obtengo toda la info del usuario que esté guardada en el localStorage...
      const userData = JSON.parse(localStorage.getItem("user"));
    
        //   Si esa info existe, settea el obj formData con la info que corresponda...
      if (userData) {
        setFormData({
            CalleYAltura: userData.CalleYAltura || "",
            Provincia: userData.Provincia || "",
            Ciudad: userData.Ciudad || "",
            CodigoPostal: userData.CodigoPostal || ""
        })
      }
    }, [])
    
    // Función que actualiza el obj de estado formData cada vez que el usuario tipea en los campos de texto...
    const handleChange = (e) => {

        // Extraigo el id y el value del TextField que disparó el evento...
        const { id, value } = e.target;

        // Actualizo el obj formData, manteniendo lo que se haya tipeado anteriormente...
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Traigo la informacion del usuario que se logueó...
        const userData = JSON.parse(localStorage.getItem("user"));
        
        // Valido que la info no esté vacía o que no tenga id...
        if (!userData || !userData.id) {
            alert("No se encontró el usuario autenticado");
            return;
        }

        // Preparo el objeto con los datos a actualizar...
        const updatedUser = {
            CalleYAltura: formData.CalleYAltura,
            Provincia: formData.Provincia,
            Ciudad: formData.Ciudad,
            CodigoPostal: formData.CodigoPostal
        }

        // Ejecuto la peticion PATCH para actualizar los datos...
        const res = await fetch(`http://localhost:8080/users/${userData.id}`,{
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(updatedUser)
        });

        // Verifico que los datos se cargaron correctamente...
        if (res.ok) {
            alert("¡Información guardada correctamente!");

            // Actualizo el localStorage con los nuevos datos...
            const newUser = {...userData, ...updatedUser}
            localStorage.setItem("user", JSON.stringify(newUser))

        } else {alert("Error al guardar la información")}
    }

    const handleClear = () => {
        localStorage.removeItem("user")
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