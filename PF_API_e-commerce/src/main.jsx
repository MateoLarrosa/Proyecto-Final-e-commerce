import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import App from './App.jsx';
import Home from './pages/pantallaDeInicio/Home.jsx';
import Login from './pages/pantallaDeInicio/Login.jsx';
import ProductDetails from './pages/pantallaDeInicio/ProductDetail.jsx';
import UserManagement from './pages/UserManagement';
import MiPerfilApp from './pages/miPerfil/MiPerfilApp.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import CarritoCompleto from './pages/carritoDeCompra/CarritoCompleto.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/mi-perfil" element={<MiPerfilApp />} />
        <Route path="/mi-carrito" element={<CarritoCompleto/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

