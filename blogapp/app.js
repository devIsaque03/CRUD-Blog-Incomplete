// Carregando módulos -----------------------------------------------
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const APP = express()
const admin = require("./routes/admin")
const path = require("path")
const mongoose = require('mongoose')

// Configurações -----------------------------------------------------
    // Body Parser
        APP.use(bodyParser.urlencoded({extend: true}))
        APP.use(bodyParser.json())
    // handlebars
        APP.engine('handlebars', handlebars.create({ defaultLayout: 'main' }).engine) // Correção aqui
        APP.set('view engine', 'handlebars')
    // mongoose
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb://localhost/blogapp').then(() => {
            console.log("Conectado ao MongoDB")
        }).catch((erro) => {
            console.log(`Falhar ao conectar no MongoDB: ${erro}`)
        })
    // Public
        // Para pegar o caminho absoluto para a pasta public
        APP.use(express.static(path.join(__dirname,"public")))
    
// Rotas -------------------------------------------------------------
    APP.use('/admin', admin)





// Outros ------------------------------------------------------------
const PORT = 8080
APP.listen(PORT, () => {
    console.log("Servidor rodando na url:")
    console.log("http://localhost:8080")
})