const express = require('express');
const router = express.Router(); 
const db = require('../config/db');

// Listar todas as consultas
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM consulta');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Cadastrar consulta
router.post('/', async (req, res) => {
    const { data_hora, paciente_id_paciente, medico_id_medico } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO consulta (data_hora, paciente_id_paciente, medico_id_medico) VALUES (?, ?, ?)',
            [data_hora, paciente_id_paciente, medico_id_medico]
        );
        res.status(201).json({ id_consulta: result.insertId });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Atualizar consulta
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { data_hora, paciente_id_paciente, medico_id_medico } = req.body;
    try {
        await db.query(
            'UPDATE consulta SET data_hora = ?, paciente_id_paciente = ?, medico_id_medico = ? WHERE id_consulta = ?',
            [data_hora, paciente_id_paciente, medico_id_medico, id]
        );
        res.json({ mensagem: 'Consulta atualizada com sucesso!' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Deletar consulta
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM consulta WHERE id_consulta = ?', [id]);
        res.json({ mensagem: 'Consulta removida com sucesso!' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;