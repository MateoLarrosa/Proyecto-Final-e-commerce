import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import App from './App.jsx';
import Home from './pages/pantallaDeInicio/Home.jsx';
import Login from './pages/carritoDeCompra/CarritoCompleto.jsx';
import UserManagement from './pages/UserManagement';
import MiPerfilApp from './pages/miPerfil/MiPerfilApp.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import CarritoCompleto from './pages/carritoDeCompra/CarritoCompleto.jsx';
import GestionProductos from './pages/gestionProductos/GestionProductos.jsx';  

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/mi-perfil" element={<MiPerfilApp />} />
        <Route path="/mi-carrito" element={<CarritoCompleto/>} />
        <Route path="/gestion-de-productos" element={<GestionProductos/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

