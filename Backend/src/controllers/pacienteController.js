const db = require('../config/db.js');

const getPacientes = (req, res) =>{
    const query = 'SELECT * FROM paciente';
    db.query(query, (err, results) => {
        if(err){
            res.status(500).json({error: 'Erro ao consultar pacientes'});
        }else{
            res.status(200).json(results);
        }
    })
};

const getPacienteById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM paciente WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if(err){
            res.status(500).json({error: 'Erro ao consultar paciente'});
        }else{
            res.status(200).json(results);
        }
    })
};

const createPaciente = (req, res) => {
    const { nome, data_nascimento, usuario_id } = req.body;

    const query = 'INSERT INTO paciente (nome, data_nascimento, usuario_id) VALUES (?, ?, ?)';
    db.query(query, [nome, data_nascimento, usuario_id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao criar paciente.' });
        } else {
            res.status(201).json({ message: 'Paciente criado com sucesso!', pacienteId: results.insertId });
        }
    });
};

const updatePaciente = (req, res) => {
    const { id } = req.params;
    const { nome, data_nascimento, cpf, endereco, telefone } = req.body;
    const query = 'UPDATE paciente SET nome = ?, data_nascimento = ?, cpf = ?, endereco = ?, telefone = ? WHERE id_paciente = ?';
    db.query(query, [nome, data_nascimento, cpf, endereco, telefone, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao atualizar paciente' });
        } else {
            res.status(200).json({ message: 'Paciente atualizado com sucesso!' });
        }
    });
};

module.exports = { getPacientes, getPacienteById, createPaciente, updatePaciente };
