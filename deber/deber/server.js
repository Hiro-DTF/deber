const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // Para permitir peticiones entre servidores

const app = express();
const port = 4000; // Cambiado a 4000

// Middleware para recibir datos en formato JSON
app.use(express.json());
app.use(cors());  // Permitir peticiones desde cualquier dominio (útil para desarrollo)

// Configuración de conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nueva_base_de_datos', // Cambiado el nombre de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.log('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a MySQL');
  }
});

// Ruta de ejemplo para obtener datos de la base de datos
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM series'; // Cambiado a 'series'
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error en la consulta');
    } else {
      res.json(results);
    }
  });
});

// Ruta para obtener todas las series
app.get('/series', (req, res) => {
  const query = 'SELECT * FROM series'; // Cambiado a 'series'
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error en la consulta');
    } else {
      res.json(results);
    }
  });
});

// Ruta para agregar una nueva serie
app.post('/series', (req, res) => {
  const { id, titulo, enlace, imagen } = req.body;
  const query = 'INSERT INTO series (id, titulo, enlace, imagen) VALUES (?, ?, ?, ?);'; // Cambiado a 'series'
  db.query(query, [id, titulo, enlace, imagen], (err, results) => {
    if (err) {
      res.status(500).send('Error al insertar');
    } else {
      res.status(200).send('Serie bien insertada');
    }
  });
});

// Ruta para obtener una serie específica por ID
app.get('/series/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM series WHERE id = ?'; // Cambiado a 'series'

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Hay un error');
    }
    if (results.length === 0) {
      return res.status(404).send('No existe la serie');
    }

    res.status(200).json(results[0]);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://192.168.1.3:${port}`);
});
