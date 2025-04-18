const db = require('../config/db');

const createMedico = (req, res) => {
    const { nome, especialidade, crm, usuario_id } = req.body;
  
    const query = 'INSERT INTO medico (nome, especialidade, crm, usuario_id) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, especialidade, crm, usuario_id], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao criar médico.' });
      } else {
        res.status(201).json({ message: 'Médico criado com sucesso!', medicoId: results.insertId });
      }
    });
  };
  



const getMedicos = (req, res) => {
    const query = 'SELECT * FROM medico';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao consultar médicos' });
        } else {
            res.status(200).json(results);
        }
    })
}

const getMedicoById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM medico WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao consultar médico' });
        } else {
            res.status(200).json(results);
        }
    })
}

module.exports = {createMedico, getMedicos, getMedicoById };