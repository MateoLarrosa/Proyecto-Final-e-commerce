import React from 'react';
import gestionProductos from './pages/gestionProductos/GestionProductos';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './pages/pantallaDeInicio/Login';
import Home from './pages/pantallaDeInicio/Home';
import ProductDetail from './pages/pantallaDeInicio/ProductDetail';
// import UserMockup from './components/UserMockup';
import 'bootstrap/dist/css/bootstrap.min.css';


const theme = createTheme({
  palette: {
    primary: {
      main: '#131921', // Azul oscuro Amazon
    },
    secondary: {
      main: '#febd69', // Naranja Amazon
    },
    error: {
      main: '#d32f2f', // Rojo para eliminar
    },
    amazonOrange: {
      main: '#ff9900',
      contrastText: '#000',
    },
    amazonGrey: {
      main: '#f0f2f2',
    },
    amazonDarkBlue: {
        main: '#232f3e',
    }
  },
  typography: {
    fontFamily: '"Amazon Ember", Arial, sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
   components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '3px',
          textTransform: 'none',
        },
      },
    },
     MuiPaper: {
        styleOverrides: {
            root: { borderRadius: '4px' }
        }
     },
     MuiTableCell: {
        styleOverrides: {
            head: { fontWeight: 'bold' }
        }
     }
  },
});

<ThemeProvider theme={theme}>
        // Aca adentro se podria agregar todo lo que va en el return para que conozca los componentes qeu se crearon arriba con el theme
    </ThemeProvider>

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home />
    </>
    // <div>
    //   <Login />
    //   {/* Si querés agregar también UserMockup, podrías ponerlo acá */}
    //   {/* <UserMockup /> */}
    // </div>
  );
}

export default App;
