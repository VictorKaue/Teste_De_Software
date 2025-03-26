-- Usando o banco de dados
USE sismed;

INSERT INTO medico (nome, especialidade, data_nascimento) VALUES
('Dr. João Silva', 'Cardiologia', '1975-05-12'),
('Dra. Maria Oliveira', 'Pediatria', '1982-11-23');

INSERT INTO paciente (cpf, nome, telefone, data_nascimento, id_medico) VALUES
('123.456.789-00', 'Ana Santos', '(61) 91234-5678', '1990-04-10', 1), -- Associado ao Dr. João Silva
('987.654.321-00', 'Carlos Pereira', '(61) 97654-3210', '1985-07-15', 2), -- Associado à Dra. Maria Oliveira
('456.789.123-00', 'Mariana Costa', '(61) 99876-5432', '1992-09-21', 1); -- Associado ao Dr. João Silva

INSERT INTO relatorio (nome_relatorio, data_criacao, id_medico, id_paciente) VALUES
('Relatório Clínico Ana Santos', '2025-03-26', 1, '123.456.789-00'), -- Associado ao Dr. João e paciente Ana
('Relatório Clínico Carlos Pereira', '2025-03-26', 2, '987.654.321-00'), -- Associado à Dra. Maria e paciente Carlos
('Relatório Clínico Mariana Costa', '2025-03-26', 1, '456.789.123-00'); -- Associado ao Dr. João e paciente Mariana
