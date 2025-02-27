-- Mostra todos os banco de dados
SHOW DATABASES;

-- Criando banco de dados
CREATE DATABASE sistemaDeCadastro;

-- Entra dentro de uma banco de dados
USE sistemaDeCadastro;

-- Mostra todas as tabelas do banco de dados local
SHOW TABLES;

-- Cria uma tabela com o nome usuários
CREATE TABLE usuarios(
    -- adiciona 3 colunas a tabela(nome, email e idade)
    nome VARCHAR(50),
    email VARCHAR(100),
    idade INT
);

-- Descreve toda a estrutura da tabela mencionada
DESCRIBE usuarios;

-- Insere dados na tabela
INSERT INTO usuarios(nome, email, idade) VALUES(
    -- Dados devem ser posicionados respectivamente a ordem colocada dentro dos parenteses acima
    "Victor Lima",
    "email@teste.com",
    8
);

-- Mostra(SELECT) todas(*) informaçãos da(FROM) tabela "usuarios"
SELECT * FROM usuarios;

-- Mostra com filtro(WHERE)
SELECT * FROM usuarios WHERE idade = 8;

-- Rodar assim deleta todos os dados da tabela usuários
-- DELETE FROM usuarios;

-- Deleta da tabela usuarios todos com o nome "Maria Aline"
DELETE FROM usuarios WHERE nome = "Maria Aline";