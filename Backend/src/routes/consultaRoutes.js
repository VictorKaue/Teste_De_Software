const express = require('express');
const { param, body } = require('express-validator');
const validate = require('../middlewares/validate');
const { getConsultas, getConsultasByMedico, getConsultasByUsuario, createConsulta } = require('../controllers/consultaController');

const router = express.Router();

// Rotas para consultas
router.get('/', getConsultas); // Lista todas as consultas (sem autenticação)

router.get(
  '/medico/:medicoId',
  param('medicoId').isInt().withMessage('O ID do médico deve ser um número inteiro'),
  validate,
  getConsultasByMedico
); // Busca consultas por médico (sem autenticação)

router.get(
  '/usuario/:usuarioId',
  param('usuarioId').isInt().withMessage('O ID do usuário deve ser um número inteiro'),
  validate,
  getConsultasByUsuario
); // Busca consultas por usuário (sem autenticação)

router.post(
  '/',
  [
    body('data_horario').notEmpty().withMessage('O campo data_horario é obrigatório.'),
    body('motivo').notEmpty().withMessage('O campo motivo é obrigatório.'),
    body('paciente_id').isInt().withMessage('O campo paciente_id deve ser um número inteiro.'),
    body('medico_id').isInt().withMessage('O campo medico_id deve ser um número inteiro.'),
    body('relatorio_id').isInt().withMessage('O campo relatorio_id deve ser um número inteiro.'),
  ],
  validate,
  createConsulta
);

module.exports = router;