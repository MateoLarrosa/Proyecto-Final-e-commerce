import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MiPerfilApp from './Pages/miPerfil/MiPerfilApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MiPerfilApp />
  </StrictMode>,
)
