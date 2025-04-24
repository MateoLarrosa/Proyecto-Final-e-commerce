import React from 'react'
import './footerStyles.css'

 const Footer = () => {
  return (
    
    <footer className="footer">
        <div className='footer-items'>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Condiciones de uso</a></li>
                <li><a href="#">Aviso de privacidad</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Acerca de</a></li>
            </ul>
        </div>
        <div className='copyright'>
            <p>&copy; 2025 Amazonas, Inc</p>
        </div>
    </footer>
    
  )
}
export default Footer