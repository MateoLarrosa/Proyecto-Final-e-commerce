import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, IconButton, InputBase, Box, Button} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NuevoNavBar({ onSearch }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const [searchValue, setSearchValue] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);

    // Recuperar el valor de búsqueda de la URL solo una vez al montar el componente
    useEffect(() => {
        if (!isInitialized) {
            const params = new URLSearchParams(location.search);
            const searchQuery = params.get('search') || '';
            setSearchValue(searchQuery);
            if (onSearch) {
                onSearch(searchQuery);
            }
            setIsInitialized(true);
        }
    }, [location.search, onSearch, isInitialized]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login-user');
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (location.pathname === '/home') {
            // Si ya estamos en home, solo actualizar la URL sin causar una recarga
            const newUrl = `/home${searchValue ? `?search=${encodeURIComponent(searchValue)}` : ''}`;
            window.history.replaceState(null, '', newUrl);
        } else {
            // Si estamos en otra página, navegar a home con el parámetro de búsqueda
            navigate(`/home?search=${encodeURIComponent(searchValue)}`);
        }
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
                    onClick={() => {
                        setSearchValue('');
                        if (onSearch) onSearch('');
                        navigate('/home');
                    }}
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

                <Box 
                    component="form"
                    onSubmit={handleSearchSubmit}
                    sx={{
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
                        value={searchValue}
                        onChange={handleSearchChange}
                        inputProps={{'aria-label':'Buscar productos en este e-commerce'}}
                    />
                    <IconButton 
                        type="submit"
                        sx={{
                            color: '#FEBD69',
                            p: '10px'
                        }}>
                        <SearchIcon />
                    </IconButton>
                </Box>

                <Box sx={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center'
                }}>
                    <IconButton sx={{ color: 'white', bgcolor:'#131921 !important' }}
                        onClick={() => navigate('/mi-carrito')}
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
                <Button variant='text' sx={{color:'white',bgcolor:'#232F3E !important'}}>Mas vendidos</Button>

            </Toolbar>
        </AppBar>
    )
}