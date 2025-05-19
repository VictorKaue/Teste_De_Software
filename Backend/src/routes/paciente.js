const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Listar todos os pacientes
router.get('/', async (resq, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM paciente');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Cadastrar paciente
router.post('/', async (req, res) => {
    const { nome, data_nascimento, cpf, rg, telefone, endereco } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO paciente (nome, data_nascimento, cpf, rg, telefone, endereco) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, data_nascimento, cpf, rg, telefone, endereco]
        );
        res.status(201).json({ id_paciente: result.insertId });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});
// Atualizar paciente

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, data_nascimento, cpf, rg, telefone, endereco } = req.body;
    try {
        await db.query(
            'UPDATE paciente SET nome = ?, data_nascimento = ?, cpf = ?, rg = ?, telefone = ?, endereco = ? WHERE id_paciente = ?',
            [nome, data_nascimento, cpf, rg, telefone, endereco, id]
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