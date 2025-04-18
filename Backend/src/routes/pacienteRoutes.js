const express = require('express');
const { getPacientes, getPacienteById, createPaciente } = require('../controllers/pacienteController');

const router = express.Router();

// Rotas CRUD para pacientes
router.get('/', getPacientes); // Lista todos os pacientes
router.get('/:id', getPacienteById); // Busca paciente por ID
router.post('/', createPaciente); // Cadastra paciente e vincula ao usuário

module.exports = router;