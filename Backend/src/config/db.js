// backend/db.js
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vklp100106',
  database: 'sismed',
  port: 3306,
});

// Atualiza para a API de promessas
const db = connection.promise();

db.connect()
  .then(() => console.log('Conexão com o banco de dados bem-sucedida!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = db;
