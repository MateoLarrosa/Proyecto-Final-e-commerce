import './App.css';
import Catalogo from './pages/Catalogo';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import gestionProductos from './pages/gestionProductos';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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

function App() {
  const CurrentPage = gestionProductos; 
  return (  
    <ThemeProvider theme={theme}>
        <div id='app-container'>
        <NavBar />
        <CurrentPage/>
        <Footer />
      </div>
    </ThemeProvider>
    
  );
}

export default App;