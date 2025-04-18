const express = require('express');
const { createMedico } = require('../controllers/medicoController');

const router = express.Router();

// Rota para cadastrar médico
router.post('/', createMedico);

module.exports = router;