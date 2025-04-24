import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import CarritoCompleto from './components/CarritoCompleto'; // Cambiamos Producto por CarritoCompleto

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar />
    <CarritoCompleto /> {/* Ahora renderizamos el carrito completo */}
    <Footer />
  </StrictMode>
)
