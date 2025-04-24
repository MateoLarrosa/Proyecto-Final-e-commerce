import React from 'react';
import './resumenCarritoStyles.css';

const ResumenCarrito = ({ total }) => {
    return (
      <div className="resumen-container">
        <div className="resumen-content">
          <h3>Total: <span className="total-amount">US${total.toFixed(2)}</span></h3>
          <button className="proceder-pago-btn">Proceder al pago</button>
        </div>
      </div>
    );
};

export default ResumenCarrito;