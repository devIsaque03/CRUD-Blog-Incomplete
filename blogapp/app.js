// Carregando módulos -----------------------------------------------
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const APP = express()
// const mongoose = require('mongoose')

// Configurações -----------------------------------------------------
    // Body Parser
        APP.use(bodyParser.urlencoded({extend: true}))
        APP.use(bodyParser.json())
    // handlebars
        APP.engine('handlebars', handlebars({deffaultLayout: 'main'}))
        APP.set('view engine', 'handlebars');
    // mongoose
        // Em Breve
    //
    
// Rotas -------------------------------------------------------------

// Outros ------------------------------------------------------------
const PORT = 8080
APP.listen(PORT, () => {
    console.log("Servidor rodando na url:")
    console.log("http://localhost:8080")
})