// Puxando módulo express retornando uma função
var express = require("express");
// Chama a função passando o resultado para a variável app
const APP = express()

// error - 'Cannot GET/' é que não tem rota

// Criando Rota
APP.get("/", function(req,res){
    res.send("Welcome to my app!")
})

// Criando rota como outro caminho (/sobre) com callback
APP.get("/sobre", function(req,res){
    res.send("about me")
})

// Criando rota como outro caminho (/blog) com callback
APP.get("/blog", function(req,res){
    res.send("My blog")
})







// Ligar servidor (Sempre a ultima linha)
// Com função de CallBack
APP.listen(8080, function() {
    console.log("Servidor rodando na url:")
    console.log("http://localhost:8080")
})