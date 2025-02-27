const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Postagem = new Schema({
    titulo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    categoria: {
        // Armazena o ID de uma categoria
        type: Schema.Types.ObjectID,
        //busca o model "categorias" para pegar o ID
        ref: "categorias",
        required: true
    },
    data: {
        type: Date,
        // Passando um valor padrão (quando sem resposta)
        default: Date.now()
    }
})

mongoose.model('postagens', Postagem)


