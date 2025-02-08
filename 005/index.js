// Módulo express
var express = require("express");
const APP = express()

// Módulo Sequelize
const Sequelize = require('sequelize')

// Módulo handlebars
const handlebars = require('express-handlebars')

// ---------------------------- MÓDULOS -------------------------------
// Config
    // template engine
        // Avisando que desejamos usar o handlebars como template engine
        APP.engine('handlebars', handlebars({defaultLayout: main}))
        APP.set('view engine', 'handlebars')
    // Conectando ao DB
        const sequelize = new Sequelize('test', 'root', '@Aa2047591863', {
            host: "localhost",
            dialect: 'mysql'
        })

        // Verificando conexão ao DB
        sequelize.authenticate().then(() => {
            console.log("Conectado com sucesso!")
        }).catch((erro) => {
            console.log("Fallha ao conectar: " + erro)
        })











// Ligando servidor 
APP.listen(8080, () => {
    console.log("Servidor rodando na url:")
    console.log("http://localhost:8080")
})