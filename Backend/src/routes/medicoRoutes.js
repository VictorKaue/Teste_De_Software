const express = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const { createMedico } = require('../controllers/medicoController');

const router = express.Router();

router.post(
  '/',
  [
    body('nome').notEmpty().withMessage('O campo nome é obrigatório.'),
    body('especialidade').notEmpty().withMessage('O campo especialidade é obrigatório.'),
    body('crm').notEmpty().withMessage('O campo CRM é obrigatório.'),
    body('usuario_id').isInt().withMessage('O campo usuario_id deve ser um número inteiro.'),
  ],
  validate,
  createMedico
);

module.exports = router;