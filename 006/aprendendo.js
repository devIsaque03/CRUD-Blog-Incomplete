// Servidor mongod já aberto

// conectando ao servidor
    // Importando módulo
    const mongoose =  require('mongoose')

    // para garantir que o Mongoose use a implementação de Promises do JavaScript padrão (global)
    mongoose.Promise = global.Promise
    
    // Conectando ao servidor do seu computador
    // Conectando também a DB se não tiver com o nome, ele mesmo cria
    mongoose.connect("mongodb://localhost/aprendendo", {
    }).then(() => {
        console.log("MongoDB Conectado...")
    }).catch((erro) => {
        console.log(`Houve um erro ao conectar no MongoDB: ${erro}`)
    })