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
                    <option value="para el hogar">Para el hogar</option>
                    <option value="vacacionar">Vacacionar</option>
                    <option value="belleza">Belleza</option>
                    <option value="cocina">Cocina</option>
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
