// FilterMenu.jsx
import React from 'react';
import './FilterMenu.css';

// Recibe 'categories' y 'currentCategory' como props
const FilterMenu = ({ onCategoryChange, onOrderChange, categories = [], currentCategory }) => {
    return (
        <div className="filter-menu">
            <div>
                {/* El valor del select ahora está controlado por 'currentCategory' */}
                <select onChange={(e) => onCategoryChange(e.target.value)} value={currentCategory}>
                    <option value="">Todas las categorías</option> {/* Cambiado "Todos" a "Todas las categorías" para claridad */}
                    {/* Generar opciones dinámicamente */}
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category} {/* Muestra el nombre de la categoría tal como viene */}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                {/* Asumimos que el dropdown de orden ya funcionaba bien */}
                <select onChange={(e) => onOrderChange(e.target.value)} defaultValue="asc">
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
        </div>
    );
};

export default FilterMenu;