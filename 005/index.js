// Módulo express
var express = require("express");
const APP = express()

// Módulo Sequelize
const Sequelize = require('sequelize')

// Módulo handlebars
const { engine } = require('express-handlebars');  // Forma correta de importar

// ---------------------------- MÓDULOS -------------------------------
// Config
    // template engine
    // Avisando que desejamos usar o handlebars como template engine
    APP.engine('handlebars', engine({ defaultLayout: 'main' })) // Usando a função 'engine' corretamente
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

// Rotas
    APP.get('/cad', (req, res) => {
        res.render('formulario')
    })











// Ligando servidor 
APP.listen(8080, () => {
    console.log("Servidor rodando na url:")
    console.log("http://localhost:8080")
})