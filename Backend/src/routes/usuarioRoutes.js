const express = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const { createUsuario } = require('../controllers/usuarioController');
const { createMedico } = require('../controllers/medicoController');

const router = express.Router();

router.post(
  '/usuario',
  [
    body('email').isEmail().withMessage('O campo email deve ser válido.'),
    body('senha').notEmpty().withMessage('O campo senha é obrigatório.'),
    body('tipo_usuario').notEmpty().withMessage('O campo tipo_usuario é obrigatório.'),
  ],
  validate,
  createUsuario
);


module.exports = router;