const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Middleware para lidar com JSON
app.use(express.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'catolica',
  database: 'sismed',
  port: 3307,
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados bem-sucedida!');
  }
});

// Rota para listar usuários
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM pacientes';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao consultar usuários' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
