const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Listar todos os pacientes
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM paciente');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Cadastrar paciente
router.post('/', async (req, res) => {
    const { nome, data_nascimento, cpf, telefone, endereco, senha } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO paciente (nome, data_nascimento, cpf, telefone, endereco, senha) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, data_nascimento, cpf, telefone, endereco, senha]
        );
        console.log('Corpo recebido:', req.body);
        res.status(201).json({ id_paciente: result.insertId });
    } catch (err) {
        console.error('Erro ao cadastrar paciente:', err);
        res.status(500).json({ erro: err.message });
    }
});

// Atualizar paciente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, data_nascimento, cpf, telefone, endereco, senha } = req.body;
    try {
        await db.query(
            'UPDATE paciente SET nome = ?, data_nascimento = ?, cpf = ?, telefone = ?, endereco = ?, senha = ? WHERE id_paciente = ?',
            [nome, data_nascimento, cpf, telefone, endereco, senha, id]
        );
        res.json({ mensagem: 'Paciente atualizado com sucesso!' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM paciente WHERE id_paciente = ?', [id]);
        res.json({ mensagem: 'Paciente removido com sucesso!' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { cpf, senha } = req.body;
  
    try {
      const [rows] = await db.query(
        'SELECT * FROM paciente WHERE cpf = ? AND senha = ?',
        [cpf, senha]
      );
  
      if (rows.length > 0) {
        res.status(200).json({ mensagem: 'Login bem-sucedido', paciente: rows[0] });
      } else {
        res.status(401).json({ mensagem: 'CPF ou senha incorretos' });
      }
    } catch (error) {
      res.status(500).json({ mensagem: 'Erro no servidor', erro: error.message });
    }
  });

module.exports = router;