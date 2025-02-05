SHOW DATABASES;

CREATE DATABASE sistemaDeCadastro;

SHOW DATABASES;

USE sistemaDeCadastro;

CREATE TABLE usuarios(
    nome VARCHAR(50),
    email VARCHAR(100),
    idade INT
);

DESCRIBE usuarios;

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Victor Lima",
    "email@teste.com",
    8
);

SELECT * FROM usuarios;

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Luis Silva",
    "email@teste22.com",
    28
);

INSERT INTO usuarios(idade, email, nome) VALUES(
    39,
    "email@teste41.com",
    "Fernando"
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Maria Aline",
    "Mariazinha@teste.com",
    8
);

SELECT * FROM usuarios WHERE idade = 8;

SELECT * FROM usuarios WHERE nome = "Fernando"; 

SELECT * FROM usuarios WHERE idade >= 18;

DELETE FROM usuarios WHERE nome = "Maria Aline";

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Maria Aline",
    "Mariazinha@teste.com",
    8
);

UPDATE usuarios SET idade = 26, email = "fernando@teste.com" WHERE nome = "fernando";