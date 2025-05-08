// FilterMenu.jsx
import React from 'react';
import './FilterMenu.css'; // Asegúrate de importar el archivo CSS

const FilterMenu = ({ onCategoryChange, onOrderChange }) => {
    return (
        <div className="filter-menu">
            <div>
                <select onChange={(e) => onCategoryChange(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="electronicos">Electrónicos</option>
                    <option value="zapatillas">Zapatillas</option>
                    <option value="ropa">Ropa</option>
                    <option value="libros">Libros</option>
                    <option value="juguetes">Juguetes</option>
                    <option value="para el hogar">Para el hogar</option>
                    <option value="mochilas">Mochilas/Bolsos</option>

                </select>
            </div>

            <div>
                <select onChange={(e) => onOrderChange(e.target.value)}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
        </div>
    );
};

export default FilterMenu;
