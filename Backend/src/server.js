const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/medicos', require('./routes/medicos'));
app.use('/pacientes', require('./routes/pacientes'));
app.use('/consultas', require('./routes/consultas'));
app.use(express.static('Frontend/'));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
