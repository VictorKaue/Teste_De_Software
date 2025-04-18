const express = require('express');
const path = require('path');
const consultaRoutes = require('./routes/consultaRoutes'); // Importa as rotas de consultas
const usuarioRoutes = require('./routes/usuarioRoutes'); // Certifique-se de que o caminho está correto
const medicoRoutes = require('./routes/medicoRoutes'); // Outras rotas, como médicos

const app = express();
const PORT = 3000;

// Middleware para receber JSON no body de POST/PUT
app.use(express.json());

// Serve arquivos estáticos da pasta /public
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api/consultas', consultaRoutes); // Rotas de consultas
app.use('/api/usuarios', usuarioRoutes); // Registra a rota de usuários
app.use('/api/medicos', medicoRoutes); // Registra a rota de médicos

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});