import Card from "./Card"
import  NavBar  from '../../Components/NavBar.jsx';
import Footer from '../../Components/Footer.jsx';
import styles from './appStyles.module.css'

function MiPerfilApp() {
  
  return (
    <>
      <div className={styles.appContainer}>
        <NavBar />
        <div className={styles.appContainerTitle}>
          <h1>Tu Cuenta</h1>
        </div>
        <div className={styles.cardContainer}>
          <Card nombreImagen="packageSearch.png" titulo="Tus Pedidos" cuerpo="Revisa todos los pedidos que has ordenado"/>
          <Card nombreImagen="spiralNotepad.png" titulo="Tus Direcciones" cuerpo="Edita o borra tus direcciones para tus futuros envios"/>
          <Card nombreImagen="securityShield.png" titulo="Login & Seguridad" cuerpo="Edita tus credenciales como nombre,email o telefono"/>
          <Card nombreImagen="customerService.png" titulo="Customer Service" cuerpo="Contacta con nosotros si necesitas ayuda"/>
        </div>
      </div>
      <Footer />
    </>
  )
  
}

export default MiPerfilApp
