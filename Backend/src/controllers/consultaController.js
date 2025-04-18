const db = require('../config/db'); // Importa o db configurado
const jwt = require('jsonwebtoken');
const consultaRoutes = require('./routes/consultaRoutes');

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'seu_segredo_jwt';
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Adiciona os dados do usuário ao objeto `req`
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido.' });
  }
};

// Lista todas as consultas (READ)
const getConsultas = (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Valores padrão
  const offset = (page - 1) * limit;

  const query = 'SELECT * FROM consulta LIMIT ? OFFSET ?';
  db.query(query, [parseInt(limit), parseInt(offset)], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao consultar consultas' });
    } else {
      res.status(200).json(results);
    }
  });
};

// Busca consultas por médico (READ)
const getConsultasByMedico = (req, res) => {
  const { medicoId } = req.params;
  const query = `
    SELECT c.* 
    FROM consulta c
    JOIN medico m ON m.id_medico = c.medico_id
    WHERE m.id_medico = ?`;
  db.query(query, [medicoId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao consultar consultas por médico' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Nenhuma consulta encontrada para este médico' });
    } else {
      res.status(200).json(results);
    }
  });
};

// Busca consultas por usuário (READ)
const getConsultasByUsuario = (req, res) => {
  const { usuarioId } = req.params;
  const query = `
    SELECT c.* 
    FROM consulta c
    JOIN paciente p ON p.id_paciente = c.paciente_id
    WHERE p.usuario_id = ?`;
  db.query(query, [usuarioId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao consultar consultas por usuário' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Nenhuma consulta encontrada para este usuário' });
    } else {
      res.status(200).json(results);
    }
  });
};

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
});

module.exports = { getConsultas, getConsultasByMedico, getConsultasByUsuario };