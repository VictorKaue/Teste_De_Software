const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Listar todos os médicos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM medico');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Cadastrar médico
router.post('/', async (req, res) => {
  const { nome, especialidade, data_nascimento, crm, senha } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO medico (nome, especialidade, data_nascimento, crm, senha) VALUES (?, ?, ?, ?, ?)',
      [nome, especialidade, data_nascimento, crm, senha]
    );
    res.status(201).json({ id_medico: result.insertId });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Atualizar médico
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, especialidade, data_nascimento, crm } = req.body;
  try {
    await db.query(
      'UPDATE medico SET nome = ?, especialidade = ?, data_nascimento = ?, crm = ? WHERE id_medico = ?',
      [nome, especialidade, data_nascimento, crm, id]
    );
    res.json({ mensagem: 'Médico atualizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Deletar médico
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM medico WHERE id_medico = ?', [id]);
    res.json({ mensagem: 'Médico removido com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Rota para login do médico
router.post('/login', async (req, res) => {
  const { crm, senha } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM medico WHERE crm = ? AND senha = ?',
      [crm, senha]
    );

    if (rows.length > 0) {
      res.status(200).json({ mensagem: 'Login bem-sucedido', medico: rows[0] });
    } else {
      res.status(401).json({ mensagem: 'CRM ou senha incorretos' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro no servidor', erro: error.message });
  }
});

module.exports = router;
