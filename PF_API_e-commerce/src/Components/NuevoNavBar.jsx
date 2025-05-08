import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Button} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

export default function NuevoNavBar() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login-user');
    };

    return(
        <AppBar 
            position="sticky"
            sx={{
                bgcolor: '#131921'
            }}>
            
            {/* Toolbar Superior */}
            <Toolbar sx={{
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center'
            }}>
                <Button
                    onClick={() => navigate('/home')}
                    sx={{
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: '700',
                        textTransform: 'none',
                        '&:hover': { background: 'transparent', color: '#FEBD69' }
                    }}
                    disableRipple
                >
                    Amazonas
                </Button>

                <Box sx={{
                    display: 'flex',
                    alignItems:'center',
                    bgcolor: 'white',
                    px: 1,
                    borderRadius: 1,
                    width: { xs: '80%', sm: '60%', md: '40%' }
                    }}>
                        <InputBase 
                            placeholder='Buscar en Amazonas'
                            sx={{
                                ml:1,
                                flex: 1
                            }}
                            fullWidth
                            inputProps={{'aria-label':'Buscar productos en este e-commerce'}}
                        />

                        <SearchIcon sx={{
                            color: '#FEBD69'
                        }}/>

                </Box>

                <Box sx={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center'
                }}>
                    <IconButton sx={{ color: 'white', bgcolor:'#131921 !important' }}
                        onClick={() => navigate('/mi-carrito')} // Cambia la ruta según sea necesario
                    >
                        <ShoppingCartIcon />
                    </IconButton>

                    <IconButton
                        sx={{ color: 'white', bgcolor: '#131921 !important' }}
                        onClick={() => {
                            if (isLoggedIn) {
                                navigate('/mi-perfil');
                            } else {
                                navigate('/login-user');
                            }
                        }}>
                        <PersonIcon />
                    </IconButton>
                    {isLoggedIn && (
                        <Button
                            onClick={handleLogout}
                            sx={{ color: 'white', ml: 2, textTransform: 'none' }}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Toolbar>

            {/* ToolBar Inferior */}
            <Toolbar sx={{
                minHeight: { xs: 32, sm: 40, md: 44 },
                display:'flex',
                justifyContent:'right',
                bgcolor:'#232F3E',
                gap:'8px'
                }}>
                
                <Button variant='text' sx={{color:'white',bgcolor:'#232F3E !important'}}>Ofertas</Button>
                <Button variant='text' sx={{color:'white',bgcolor:'#232F3E !important'}}>Tendencias</Button>
                <Button variant='text' sx={{color:'white',bgcolor:'#232F3E !important'}}>Novedades</Button>
                <Button variant='text' sx={{color:'white',bgcolor:'#232F3E !important'}}>Más vendidos</Button>

            </Toolbar>
        </AppBar>
    )
}