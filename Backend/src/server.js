const express = require('express');
const path = require('path');
const consultaRoutes = require('./Backend/src/routes/consultaRoutes'); // Importa as rotas de consultas

const app = express();
const PORT = 3000;

// Middleware para receber JSON no body de POST/PUT
app.use(express.json());

// Serve arquivos estáticos da pasta /public
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api/consultas', consultaRoutes); // Rotas de consultas

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});