import './navBarStyles.css'
import locationIcon from '../assets/location.png'
import cartIcon from '../assets/cart.png'
import glassIcon from '../assets/magnifyingGlass.png'
import menuIcon from '../assets/icono-menu.png'
import userIcon from '../assets/person.png'
import React from 'react'

export const NavBar = () => {
return (
    <>
    <header className="header">
        <div className="header-left">
        <a href="/" className="logo">Amazonas</a>
        <a href="#login" className="user-icon-container">
            <img src={userIcon} alt="usuario" />
        </a>
        </div>

        <div className="search-container">
        <input type="text" className='nav-input' placeholder='Buscar en Amazonas' />
        <button className='nav-button'><img src={glassIcon} alt="magnifying glass" /></button>
        </div>

        <div className="header-right">
        <a href="/" className="nav-link">
            <img src={locationIcon} alt="ubicacion" />
        </a>
        <a href="/" className="nav-link">
            <img src={cartIcon} alt="carrito" />
        </a>
        </div>
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
            <a href="/mi-perfil">Tu Cuenta</a>
        </div>
        </nav>
    </header>
    </>
)
}
