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
}

module.exports = { getPacientes, getPacienteById };
