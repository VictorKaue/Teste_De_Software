USE sismed;

INSERT INTO medico (nome, data_nascimento) VALUES
('Dr. João Silva', '1975-05-12'),
('Dra. Maria Oliveira', '1982-11-23');

INSERT INTO paciente (nome, dataNascimento, id_medico) VALUES
('Ana Santos', '1990-04-10', 1), -- Associado ao Dr. João Silva
('Carlos Pereira', '1985-07-15', 2), -- Associado à Dra. Maria Oliveira
('Mariana Costa', '1992-09-21', 1); -- Associado ao Dr. João Silva

-- Inserindo dados na tabela relatorio
INSERT INTO relatorio (nome_relatorio, id_medico, id_paciente) VALUES
('Relatório Clínico Ana Santos', 1, 1), -- Associado ao Dr. João e paciente Ana
('Relatório Clínico Carlos Pereira', 2, 2), -- Associado à Dra. Maria e paciente Carlos
('Relatório Clínico Mariana Costa', 1, 3); -- Associado ao Dr. João e paciente Mariana
