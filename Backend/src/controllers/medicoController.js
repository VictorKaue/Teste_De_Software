const db = require('../config/db');

const createMedico = (req, res) => {
    const { email, senha, nome, especialidade, data_nascimento, crm } = req.body;

    // Inicia uma transação
    db.beginTransaction(err => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao iniciar transação' });
        }

        // Insere o usuário com tipo "medico"
        const userQuery = 'INSERT INTO usuario (email, senha, tipo_usuario) VALUES (?, ?, ?)';
        db.query(userQuery, [email, senha, 'medico'], (err, userResults) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
                });
            }

            const usuarioId = userResults.insertId; // ID do usuário recém-criado

            // Insere o médico vinculado ao usuário
            const medicoQuery = 'INSERT INTO medico (nome, especialidade, data_nascimento, crm, usuario_id_usuario) VALUES (?, ?, ?, ?, ?)';
            db.query(medicoQuery, [nome, especialidade, data_nascimento, crm, usuarioId], (err, medicoResults) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Erro ao cadastrar médico' });
                    });
                }

                // Confirma a transação
                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Erro ao confirmar transação' });
                        });
                    }

                    res.status(201).json({
                        message: 'Médico e usuário cadastrados com sucesso!',
                        medicoId: medicoResults.insertId,
                        usuarioId: usuarioId,
                    });
                });
            });
        });
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

const getMedicos = (req, res) => {
    const query = 'SELECT * FROM medico';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao consultar médicos' });
        } else {
            res.status(200).json(results);
        }
    })
}

const getMedicoById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM medico WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao consultar médico' });
        } else {
            res.status(200).json(results);
        }
    })
}

module.exports = { updatePaciente, createMedico, getMedicos, getMedicoById };