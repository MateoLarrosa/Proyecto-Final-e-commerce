import './navBarStyles.css'
import locationIcon from '../assets/location.png'
import cartIcon from '../assets/cart.png'
import glassIcon from '../assets/magnifyingGlass.png'
import menuIcon from '../assets/icono-menu.png'

import React from 'react'

 const NavBar = () => {
  return (
    <>
      <header className="header">
          <a href="/" className="logo">Amazonas</a>

          <div className="search-container">
              <input type="text" className='nav-input' placeholder='Buscar en Amazonas' />
              <button className='nav-button'><img src={glassIcon} alt="magnifying glass" /></button>
          </div>

          <nav className="navbar">
              <a href="/"><img src={locationIcon} alt="ubicacion" /></a>
              <a href="/"><img src={cartIcon} alt="carrito" /></a>
          </nav>
      </header>
      <header className='sub-header'>
          <nav className='sub-navbar'>
            <div className='sub-navbar-logo'>
              <a href="/"><img src={menuIcon} alt="menu hamburguesa" /></a>
            </div>
            <div className='sub-navbar-links'>
              <a href="/">Ofertas</a>
              <a href="/">Tendencias</a>
              <a href="/">Novedades</a>
              <a href="/">Más Vendidos</a>
            </div>
          </nav>
      </header>
    
    </>
  )
}
export default NavBar