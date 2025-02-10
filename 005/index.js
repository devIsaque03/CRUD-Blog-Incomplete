// Módulo express
var express = require("express");
const APP = express()

// Módulo handlebars
const { engine } = require('express-handlebars');  // Forma correta de importar

// módulo body-parser
const bodyParser = require('body-parser')

// Importando Post
const Post = require('./models/Post')

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
    APP.get('/', (req, res) => {

        
        // renderiza handlebars
        res.render('home')
    })

    APP.get('/cad', (req, res) => {
        // renderiza handlebars
        res.render('formulario')
    })
    // Entra nela só usando o método 'post'
    APP.post('/add', (req,res) => {
        // Inserindo dados na tabela
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(() => {
            // redirecionamento
            res.redirect('/')
        }).catch((erro) => {
            res.send(`Houve um erro: ${erro}`)
        })
    })











// Ligando servidor 
APP.listen(8080, () => {
    console.log("Servidor rodando na url:")
    console.log("http://localhost:8080")
})