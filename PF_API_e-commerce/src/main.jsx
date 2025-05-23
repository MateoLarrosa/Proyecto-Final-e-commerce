import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import App from './App.jsx';
import Home from './pages/pantallaDeInicio/Home.jsx';
import ProductDetails from './pages/pantallaDeInicio/ProductDetail.jsx';
import MiPerfilApp from './pages/miPerfil/MiPerfilApp.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import CarritoCompleto from './pages/carritoDeCompra/CarritoCompleto.jsx';
import GestionProductos from './pages/gestionProductos/GestionProductos.jsx';  
import InfoLoginYSeguridad from './pages/miPerfil/InfoLoginYSeguridad.jsx';
import TusDirecciones from './pages/miPerfil/TusDirecciones.jsx';
import CustomerService from './pages/miPerfil/CustomerService.jsx';
import Register from './pages/registro&login/Register.jsx';
import LoginUser from './pages/registro&login/LoginUser.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/mi-perfil" element={<MiPerfilApp />} />
        <Route path="/mi-carrito" element={<CarritoCompleto/>} />
        <Route path="/gestion-de-productos" element={<GestionProductos/>} />
        <Route path="/mi-perfil/login-seguridad" element={<InfoLoginYSeguridad/>} />
        <Route path="/mi-perfil/customer-service" element={<CustomerService/>} />
        <Route path="/mi-perfil/customer-service" element={<CustomerService/>} />
        <Route path="/mi-perfil/tus-direcciones" element={<TusDirecciones/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login-user" element={<LoginUser />} />


      </Routes>
    </BrowserRouter>
  </StrictMode>
);

