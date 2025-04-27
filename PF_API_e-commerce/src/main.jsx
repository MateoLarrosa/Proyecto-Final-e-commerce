import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import MiPerfilApp from './Pages/miPerfil/MiPerfilApp.jsx'
import { App } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
