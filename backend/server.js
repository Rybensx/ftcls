const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Configura tu base de datos y otros middlewares aquí
// ...

// Define la ruta del frontend
const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Maneja todas las rutas con el archivo index.html del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
