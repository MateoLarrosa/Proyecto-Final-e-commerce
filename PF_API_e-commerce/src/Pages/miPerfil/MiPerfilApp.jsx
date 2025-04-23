import Card from "./Card"
import { NavBar } from "../../Components/NavBar"
import { Footer } from "../../Components/Footer"
import './appStyles.css'

function MiPerfilApp() {
  
  return(
    <div id="app-container">
      <NavBar/>

      <div id="app-container-title">
        <h1>Tu Cuenta</h1>
      </div>

      <div id="card-container">
        <Card nombreImagen="packageSearch.png" titulo="Tus Pedidos" cuerpo="Revisa todos los pedidos que has ordenado"/>
        <Card nombreImagen="spiralNotepad.png" titulo="Tus Direcciones" cuerpo="Edita o borra tus direcciones para tus futuros envios"/>
        <Card nombreImagen="securityShield.png" titulo="Login & Seguridad" cuerpo="Edita tus credenciales como nombre,email o telefono"/>
        <Card nombreImagen="customerService.png" titulo="Customer Service" cuerpo="Contacta con nosotros si necesitas ayuda"/>

      </div>

      <Footer/>
    </div>
  )
  
}

export default MiPerfilApp
