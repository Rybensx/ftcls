const express = require('express');
const path = require('path');
const { Pool } = require('pg'); // Importar el cliente de PostgreSQL
const app = express();

// Configurar la conexión a PostgreSQL
const pool = new Pool({
  host: 'dpg-cq1maa3v2p9s73d46bdg-a', // Hostname proporcionado por Render
  user: 'root', // Username proporcionado por Render
  password: '6PvIhn6euZQyPTYLdOQnbfUu0MJygEsy', // Password proporcionado por Render
  database: 'ramos', // Nombre de la base de datos proporcionado por Render
  port: 5432, // Puerto estándar de PostgreSQL
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/api', (req, res) => {
  res.send('API is running...');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
