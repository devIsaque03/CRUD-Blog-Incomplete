// Chama o modulo sequelize
const Sequelize = require('sequelize')

// Conecta ao banco e o guarda dentro da CONST
// precisa enviar: nome da DB, do usuário e a senha
const sequelize = new Sequelize('test', 'root', '@Aa2047591863', {
    // Local do servidor
    host: "localhost",
    // Linguagem da DB
    dialect: 'mysql'
})

// Verifica se foi possível conectar a DB armazenada da CONST
sequelize.authenticate().then(() => {
    console.log("Conectado com sucesso!")
}).catch((erro) => {
    console.log("Fallha ao conectar: " + erro)
})

// model para postagens
// Cria uma tabela
const Postagem = sequelize.define('postagens', {
    // Ja cria o ID automáticamente
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

// Sincroniza o código acima com o servidor mysql criando assim a tabela
// Postagem.sync({force: true})

// Cria uma postagem
// Postagem.create({
//     titulo: "UM TITULO QUALQUER",
//     conteudo: "oasdfjasnbdflkçjabnepiwjufbapsjndflkasbdlkvnbaslkvjbaolp"
// })

// ---------------------------------------------------------------------
// model para usuarios
const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    }, 
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})
// Sincroniza o código acima com o servidor mysql criando assim a tabela
// Usuario.sync({force: true})

// Cria um usuário
// Usuario.create({
//     nome: "Isaque Samuel",
//     sobrenome: "Adão Cardoso",
//     idade: 21,
//     email: "Isaque123@gmail.com"
// });