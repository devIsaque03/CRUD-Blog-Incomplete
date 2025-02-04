// Puxando módulo (no NODE já tem o módulo HTTP existe para criar aplicações WEB[backend])
var http = require('http')

// Abrindo servidor HTTP
//http.createServer().listen(8080) //http:localhost:8080

// Servidor com função de callback
http.createServer(function(req, res) {
    // Enviar um mensagem ao cliente após feito a requisição
    res.end("Hello World, welcome to my website!");
}).listen(8080)

console.log("Servidor Rodando!")