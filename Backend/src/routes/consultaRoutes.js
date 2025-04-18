const express = require('express');
const { param } = require('express-validator');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/auth');
const { getConsultas, getConsultasByMedico, getConsultasByUsuario } = require('../controllers/consultaController');

const router = express.Router();

// Rotas para consultas
router.get('/', authMiddleware, getConsultas); // Lista todas as consultas (protegida por autenticação)

router.get(
  '/medico/:medicoId',
  param('medicoId').isInt().withMessage('O ID do médico deve ser um número inteiro'),
  validate,
  getConsultasByMedico
); // Busca consultas por médico

router.get(
  '/usuario/:usuarioId',
  param('usuarioId').isInt().withMessage('O ID do usuário deve ser um número inteiro'),
  validate,
  getConsultasByUsuario
); // Busca consultas por usuário

module.exports = router;