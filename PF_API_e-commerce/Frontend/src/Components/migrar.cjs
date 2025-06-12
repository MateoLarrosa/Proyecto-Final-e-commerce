const fs = require('fs');
const mysql = require('mysql2/promise');

async function migrar() {
  const datos = JSON.parse(fs.readFileSync('../../db.json', 'utf-8'));

  const conn = await mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'amazonas'
  });

  // Limpia las tablas antes de migrar para evitar duplicados
  await conn.query('DELETE FROM productos');
  await conn.query('DELETE FROM users');

  for (const user of datos.users) {
    await conn.query('INSERT INTO users (id, username, email, password, nombre, apellido, role, CalleYAltura, Provincia, Ciudad, CodigoPostal, edad, telefono, indicativo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      user.id, 
      user.username || "", 
      user.email || "", 
      user.password || "", 
      user.nombre || "", 
      user.apellido || "", 
      user.role || "", 
      user.CalleYAltura || "", 
      user.Provincia || "", 
      user.Ciudad || "", 
      user.CodigoPostal || "", 
      user.edad || "", 
      user.telefono || "", 
      user.indicativo || ""
    ]);
  }

  for (const prod of datos.productos) {
    await conn.query('INSERT INTO productos (id, nombre, precio, stock, categoria, imagen, userId) VALUES (?, ?, ?, ?, ?, ?, ?)', [
      prod.id, 
      prod.nombre || "", 
      prod.precio || 0.0, 
      prod.stock || 0, 
      prod.categoria || "", 
      prod.imagen || "", 
      prod.userId || ""
    ]);
  }

  console.log('Migración completada.');
  await conn.end();
}

migrar().catch(console.error);
