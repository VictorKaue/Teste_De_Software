const db = require('../config/db');

// Lista todas as consultas
const getAllConsultas = callback => {
  const query = 'SELECT * FROM consulta';
  db.query(query, callback);
};

// Busca consultas por médico
const getConsultasByMedico = (medicoId, callback) => {
  const query = `
    SELECT c.* 
    FROM consulta c
    JOIN medico m ON m.id_medico = c.medico_id
    WHERE m.id_medico = ?`;
  db.query(query, [medicoId], callback);
};

// Busca consultas por usuário
const getConsultasByUsuario = (usuarioId, callback) => {
  const query = `
    SELECT c.* 
    FROM consulta c
    JOIN paciente p ON p.id_paciente = c.paciente_id
    WHERE p.usuario_id = ?`;
  db.query(query, [usuarioId], callback);
};

module.exports = { getAllConsultas, getConsultasByMedico, getConsultasByUsuario };