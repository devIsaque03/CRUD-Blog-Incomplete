// Módulo express
var express = require("express");
const APP = express()

// Módulo handlebars
const { engine } = require('express-handlebars');  // Forma correta de importar

// módulo body-parser
const bodyParser = require('body-parser')

// Importando Post
const Post = require('./models/Post.js')

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
        // Chama todos os posts e os envia para o handlebars em ordem Descrecente (novo -> antigo)
        Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
            // Converter as instâncias do Sequelize para objetos simples
            const postsJSON = posts.map(post => post.get());

            // renderiza handlebars e envia os dados para a página
            res.render('home', {posts: postsJSON})
        }) .catch((erro) => {
            res.send(`Houve um erro: ${erro}`)
        })       
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
    // Deletando Post pelo id (parametro passado)
    APP.get('/deletar/:id', (req, res) => {
        // Pelo id da rota 
        Post.destroy({where: {'id': req.params.id}}).then(() => {
            res.send("Postagem Deletada com Sucesso!")
        }).catch((erro) => {
            res.send("Essa postagem não existe!")
        })
    })











// Ligando servidor 
APP.listen(8080, () => {
    console.log("Servidor rodando na url:")
    console.log("http://localhost:8080")
})