// Carregando módulos -----------------------------------------------
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const APP = express();
const admin = require("./routes/admin");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
require("./models/Postagem");
const Postagem = mongoose.model("postagens");
const Categoria = mongoose.model("categorias");
const usuarios = require("./routes/usuario") 

// Configurações -----------------------------------------------------
// Sessão
APP.use(
  session({
    // senha
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true,
  })
);
APP.use(flash());
// Middleware
APP.use((req, res, next) => {
  //variáveis globais
  res.locals.success_msg = req.flash("success_msg");
  res.locals.erro_msg = req.flash("eroor_msg");

  next();
});

// Body Parser
APP.use(bodyParser.urlencoded({ extend: true }));
APP.use(bodyParser.json());

APP.use(express.json()); // Para lidar com requisições JSON
APP.use(express.urlencoded({ extended: true })); // Para lidar com formulários URL-encoded

// handlebars
APP.engine(
  "handlebars",
  handlebars.create({
    defaultLayout: "main",
    // Ativar json no handleabrs
    helpers: {
      json: function (context) {
        return JSON.stringify(context, null, 2);
      },
    },

    allowProtoPropertiesByDefault: true, // Desabilita a verificação de protótipo
  }).engine
); // Correção aqui
APP.set("view engine", "handlebars");

// mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/blogapp")
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((erro) => {
    console.log(`Falhar ao conectar no MongoDB: ${erro}`);
  });
// Public
// Para pegar o caminho absoluto para a pasta public
APP.use(express.static(path.join(__dirname, "public")));

// Rotas -------------------------------------------------------------
APP.get("/", (req, res) => {
  Postagem.find()
    .populate("categoria")
    .sort({ data: "desc" })
    .then((postagens) => {
      const postagensSimples = postagens.map((postagem) => ({
        nome: postagem.categoria.nome,
        data: postagem.data,
        titulo: postagem.titulo,
        descricao: postagem.descricao,
        slug: postagem.slug,
      }));

      res.render("index", { postagens: postagensSimples });
    })
    .catch((erro) => {
      req.flash("error_msg", "Houve um erro interno");
      res.redirect("/404");
    });
});

APP.get("/postagem/:slug", (req, res) => {
  Postagem.findOne({ slug: req.params.slug })
    .then((postagem) => {
      if (postagem) {
        // Como 'postagem' é um único documento, não é necessário usar map()
        const postagemSimples = {
          conteudo: postagem.conteudo,
          titulo: postagem.titulo,
          data: postagem.data,
        };

        res.render("postagem/index", { postagem: postagemSimples });
      } else {
        // Se não encontrar postagem, redireciona com mensagem de erro
        req.flash("error_msg", "Esta postagem não existe");
        res.redirect("/404"); // ou para outra página de erro
      }
    })
    .catch((erro) => {
      console.error(erro); // Para facilitar a depuração
      req.flash("error_msg", "Houve um erro interno");
      res.redirect("/404"); // Ou redireciona para uma página de erro
    });
});

APP.get("/categorias", (req, res) => {
    Categoria.find().then((categorias) => {
        const categoriasSimples = categorias.map((categoria) => ({
            nome: categoria.nome,
            slug: categoria.slug
        }))
        res.render('categorias/index', {categorias: categoriasSimples})
    }).catch((erro) => {
        req.flash('error_msg', "Houve um erro interno ao listar as categorias");
        res.redirect('/');
    });
});

APP.get('/categorias/:slug', (req, res) => {
    Categoria.findOne({slug: req.params.slug}).then((categoria) => {
        if(categoria){
            Postagem.find({categoria: categoria._id}).then((postagens) => {

                const categoriaSimples = {
                    _id: categoria._id,
                    nome: categoria.nome,
                    slug: categoria.slug,
                    date: categoria.date 
                }

                const postagensSimples = postagens.map((postagem) => ({
                    nome: postagem.categoria.nome,
                    data: postagem.data,
                    titulo: postagem.titulo,
                    descricao: postagem.descricao,
                    slug: postagem.slug,
                }))

                res.render('categorias/postagens', {categorias: categoriaSimples, postagens: postagensSimples })
            }).catch((erro) => {
                req.flash('error_msg', "")
                res.redirect('/')
            })
        } else {
            req.flash('error_msg', "essa categoria não existe")
            res.redirect('/')
        }
    }).catch((erro) => {
        req.flash('error_msg', "Houve um erro interno ao carregar a página desta categoria")
        res.redirect('/')
    })
})

APP.get("/404", (req, res) => {
  res.send("Erro 404!");
});

APP.get("/posts", (req, res) => {
  res.send("Lista Posts");
});

APP.use("/admin", admin);
APP.use("/usuarios", usuarios)

// Outros ------------------------------------------------------------
const PORT = 8080;
APP.listen(PORT, () => {
  console.log("Servidor rodando na url:");
  console.log("http://localhost:8080");
});
