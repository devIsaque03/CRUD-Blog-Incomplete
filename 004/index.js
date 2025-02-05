// Puxando módulo express retornando uma função
var express = require("express");
// Chama a função passando o resultado para a variável app
const APP = express()

// error - 'Cannot GET/' é que não tem rota

// Criando Rota que envia um arquivo
APP.get("/", function(req,res){
    //Envia arquivo do diretório
    // dirname pega o diretório local
    res.sendFile(__dirname + '/html/index.html')
})

// Criando rota como outro caminho (/sobre) com callback
APP.get("/sobre", function(req,res){
    res.send("about me")
})

// Criando rota como outro caminho (/blog) com callback
APP.get("/blog", function(req,res){
    res.send("My blog")
})

// Rota com Parâmetro(':nome', ':cargo' são como uma variável)
APP.get('/ola/:nome/:cargo/:idade', function(req, res) {
    // puxa as variáveis e as envia
    // res.send(req.params)

    // Usa os parâmetros (Envia só um send)
    res.send("<h1>Ola " + req.params.nome + "</h1>" + "<h2>Você tem " + req.params.idade + " anos</h2>" + "<h2>Seu cargo e: " + req.params.cargo + "</h2>")
})







// Ligar servidor (Sempre a ultima linha)
// Com função de CallBack
APP.listen(8080, function() {
    console.log("Servidor rodando na url:")
    console.log("http://localhost:8080")
})