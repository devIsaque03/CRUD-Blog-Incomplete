const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Criando um model - Categoria
const Categoria = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        // Passando um valor padrão (quando sem resposta)
        default: Date.now()
    }
})

// Cria uma tabela e deve indicar qual 'model' usar
mongoose.model('categorias', Categoria)