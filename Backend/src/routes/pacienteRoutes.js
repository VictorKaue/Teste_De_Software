const express = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const { getPacientes, getPacienteById, createPaciente } = require('../controllers/pacienteController');

const router = express.Router();

// Rotas CRUD para pacientes
router.get('/', getPacientes); // Lista todos os pacientes
router.get('/:id', getPacienteById); // Busca paciente por ID
router.post(
  '/',
  [
    body('nome').notEmpty().withMessage('O campo nome é obrigatório.'),
    body('data_nascimento').isDate().withMessage('O campo data_nascimento deve ser uma data válida.'),
    body('cpf').notEmpty().withMessage('O campo CPF é obrigatório.'),
    body('usuario_id').isInt().withMessage('O campo usuario_id deve ser um número inteiro.'),
  ],
  validate,
  createPaciente
); // Cadastra paciente e vincula ao usuário

module.exports = router;