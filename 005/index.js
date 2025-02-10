// Módulo express
var express = require("express");
const APP = express()

// Módulo handlebars
const { engine } = require('express-handlebars');  // Forma correta de importar

// módulo body-parser
const bodyParser = require('body-parser')

// ---------------------------- MÓDULOS -------------------------------
// Config
    // template engine
    // Avisando que desejamos usar o handlebars como template engine
    APP.engine('handlebars', engine({ defaultLayout: 'main' })) // Usando a função 'engine' corretamente
    APP.set('view engine', 'handlebars')

    // body-parser - configurando
    APP.use(bodyParser.urlencoded({extend: false}))
    APP.use(bodyParser.json())

// Rotas
    APP.get('/cad', (req, res) => {
        res.render('formulario')
    })
    // Entra nela só usando o método 'post'
    APP.post('/add', (req,res) => {
        res.send(`Titulo: ${req.body.titulo} Conteudo: ${req.body.conteudo}`)
    })











// Ligando servidor 
APP.listen(8080, () => {
    console.log("Servidor rodando na url:")
    console.log("http://localhost:8080")
})