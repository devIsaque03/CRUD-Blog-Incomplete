// Módulo Sequelize
const Sequelize = require('sequelize')

// Conectando ao DB
const sequelize = new Sequelize('postapp', 'root', '@Aa2047591863', {
    host: "localhost",
    dialect: 'mysql'
})

// Verificando conexão ao DB
sequelize.authenticate().then(() => {
    console.log("Conectado com sucesso!")
}).catch((erro) => {
    console.log("Fallha ao conectar: " + erro)
})

// Exportando Sequelize
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}