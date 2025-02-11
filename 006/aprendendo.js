// Servidor mongod já aberto

// conectando ao servidor
    // Importando módulo
    const mongoose =  require('mongoose')

    // para garantir que o Mongoose use a implementação de Promises do JavaScript padrão (global)
    mongoose.Promise = global.Promise

    // Conectando ao servidor do seu computador
    // Conectando também a DB se não tiver com o nome, ele mesmo cria
    mongoose.connect("mongodb://localhost/aprendendo", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB Conectado...")
    }).catch((erro) => {
        console.log(`Houve um erro ao conectar no MongoDB: ${erro}`)
    });

// Criando um model - usuarios

// Usar Schema na variavel quando for para mongodb
const UserSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    pais: {
        type: String
    }
});

// Cria uma tabela e deve indicar qual 'model' usar
const User = mongoose.model('Users', UserSchema);

// Adiciona um usuário a tabela "users"
new User({
    nome: "Jhon",
    sobrenome: "doe",
    email: "jhon@doe.com",
    idade: 34,
    pais: "EUA"
}).save().then(() => {
    console.log("Usuário Criado com Sucesso!")
}).catch((erro) => {
    console.log(`Houve um erro ao Registrar o Usuário: ${erro}`)
});

