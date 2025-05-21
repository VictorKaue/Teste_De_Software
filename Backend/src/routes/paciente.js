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

module.exports = router;