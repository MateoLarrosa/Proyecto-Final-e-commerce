import React from 'react';
import styles from './resumenCarritoStyles.module.css';

const ResumenCarrito = ({ total }) => {
  return (
    <div className={styles.resumenContainer}>
      <div className={styles.resumenContent}>
        <h3>Total: <span className={styles.totalAmount}>US${total.toFixed(2)}</span></h3>
        <button className={styles.procederPagoBtn}>Proceder al pago</button>
      </div>
    </div>
  );
};

export default ResumenCarrito;
