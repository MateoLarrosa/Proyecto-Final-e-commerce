import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import react from 'react'
import App from './App.jsx'
import Home from './pages/pantallaDeInicio/Home.jsx'
import Login from './pages/pantallaDeInicio/Login.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
)
