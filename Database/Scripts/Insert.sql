-- Usando o banco de dados
USE sismed;

-- Inserindo pacientes
INSERT INTO paciente (cpf, nome, telefone, data_nascimento, endereco, usuario_id) VALUES
('123.456.789-00', 'Ana Santos', '91234-5678', '1990-04-10', 'Rua A, 123', 3),
('987.654.321-00', 'Carlos Pereira', '97654-3210', '1985-07-15', 'Rua B, 456', 3),
('456.789.123-00', 'Mariana Costa', '99876-5432', '1992-09-21', 'Rua C, 789', 3);

-- Inserindo relatórios
INSERT INTO relatorio (descricao) VALUES
('Relatório Clínico Ana Santos'),
('Relatório Clínico Carlos Pereira'),
('Relatório Clínico Mariana Costa');

-- Inserindo consultas
INSERT INTO consulta (data_horario, motivo, paciente_id, medico_id, relatorio_id) VALUES
('2025-04-20 10:00:00', 'Consulta de rotina', 1, 1, 1),
('2025-04-21 14:00:00', 'Consulta de retorno', 2, 2, 2),
('2025-04-22 09:30:00', 'Consulta de acompanhamento', 3, 1, 3);