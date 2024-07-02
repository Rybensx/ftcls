const express = require('express');
const path = require('path');
const { Pool } = require('pg'); // Importar el cliente de PostgreSQL
const app = express();

// Configurar la conexión a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
    process.exit(1); // Salir si no se puede conectar a la base de datos
  } else {
    console.log('PostgreSQL connected...');
  }
});

app.use(express.json());

// Middleware para servir archivos estáticos desde el directorio 'ftcls/frontend/build'
app.use(express.static(path.join(__dirname, 'ftcls/frontend/build')));

// Ruta para servir el archivo 'index.html' en todas las demás rutas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ftcls/frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
