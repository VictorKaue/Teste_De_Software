const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

const db = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root', 
  password: 'catolica', 
  database: 'sismed',
  port: 3306 
});

app.get('/', (req, res) => {
    db.query('SELECT * FROM sua_tabela', (err, results) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send('Erro no servidor');
      } else {
        res.json(results); 
      }
    });
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados bem-sucedida!');
  }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });