const express = require('express');
const app = express();
const medicosRouter = require('./routes/medicos');

app.use(express.json());
app.use('/medicos', medicosRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
