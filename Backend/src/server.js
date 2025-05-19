const express = require('express');
const app = express();
const medicosRouter = require('./routes/medicos');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/medicos', medicosRouter);
app.use('/pacientes', require('./routes/paciente'));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
