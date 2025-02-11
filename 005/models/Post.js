// Importano Sequelize
const db = require('./db')

// Usando sequelize para a criação de tabela
const Post = db.sequelize.define('Postagens', {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
})

// Post.sync({force: true})

// Exportanto Post (exportando a tabela)
module.exports = Post