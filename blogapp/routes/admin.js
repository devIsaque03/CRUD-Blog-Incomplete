const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Postagem')
const Postagem = mongoose.model('postagens')

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send("Página de posts")
})

router.get('/categorias', (req, res) => {
    // Listando todas os documentos
    Categoria.find().sort({date:'desc'}).then((categorias) => {
        console.log(categorias)

        // "Limpa" os dados e cria um novo objeto simples para passar para o Handlebars
        const categoriasSimples = categorias.map(categoria => ({
            _id: categoria._id,
            nome: categoria.nome,
            slug: categoria.slug,
            date: categoria.date
        }));

        res.render("admin/categorias", { categorias: categoriasSimples })
    }).catch((erro) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })
})

router.get('/categorias/add', (req, res) => {
    res.render("admin/addcategorias")
})

// Post para envio de formulário
router.post('/categorias/nova', (req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "nome inválido"})
    }

    
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "slug inválido"})
    }

    if (req.body.nome.length <2 ) {
        erros.push({texto: "Nome da categoria é muito pequeno!"})
    }

    if(erros.length > 0){
        res.render('admin/addcategorias', {erros: erros})
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(() => {
            req.flash('success_msg', "categoria criada com sucesso!")
            res.redirect('/admin/categorias')
        }).catch((erro) => {
            req.flash('error_msg', "Houve um erro ao salvar a categoria, tente novamente!")
            res.redirect('/admin')
        })
    }
})

router.get('/categorias/edit/:id', (req, res) => {
    //Preencher dados automaticamente
        //Busca 'UM' registro passado com id específico
        Categoria.findOne({_id:req.params.id}).then((categoria) => {
        
        // "Limpa" os dados e cria um novo objeto simples para passar para o Handlebars
        const categoriaSimples = {
            _id: categoria._id,
            nome: categoria.nome,
            slug: categoria.slug,
            date: categoria.date 
        };

            res.render('admin/editcategorias',{categoria: categoriaSimples})
        }).catch((erro) => {
            req.flash('error_msg', "Essa categoria não existe")
            res.redirect('/admin/categorias')
        })
})

// Post para envio de formulário
router.post('/categorias/edit', (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() => {
            res.flash('success_msg', "Categoria Editada com Sucesso")
            res.redirect('/admin/categorias')
        }).catch((erro) => {
            req.flash('error_msg', "Erro interno ao salvar edição da categoria")
            res.redirect('/admin/categorias')
        })

    }).catch((erro) => {
        req.flash('error_msg', "Erro ao editar categoria")
        res.redirect('/admin/categorias')
    })

})

router.post('/categorias/deletar', (req, res) => {
    Categoria.deleteOne({ _id: req.body.id })  // Usando deleteOne ao invés de remove
        .then(() => {
            req.flash('success_msg', "Categoria deletada com sucesso");
            res.redirect('/admin/categorias');
        })
        .catch((erro) => {
            req.flash('error_msg', "Erro interno ao deletar a categoria");
            res.redirect('/admin/categorias');
        });
});

router.get('/postagens', (req, res) => {

    Postagem.find().populate('categoria').sort({date:'desc'}).then((postagens) => {

        const postagensSimples = postagens.map(postagem => ({
            titulo: postagem.titulo,
            descricao: postagem.descricao,
            date: postagem.data,
            categoria: postagem.categoria.nome
        }));

        res.render('admin/postagens', { postagens: postagensSimples})
    }).catch((erro) => {
            req.flash('error_msg', "Erro ao listar postagens");
            res.redirect('/admin');
    });
})

router.get('/postagens/add', (req, res) => {
    Categoria.find().then((categorias) => {

        // "Limpa" os dados e cria um novo objeto simples para passar para o Handlebars
        const categoriasSimples = categorias.map(categoria => ({
            _id: categoria._id,
            nome: categoria.nome,
            slug: categoria.slug,
            date: categoria.date
        }));

        res.render('admin/addpostagens', {categorias: categoriasSimples})
    }).catch((erro) => {
        req.flash('error_msg', "Erro ao carregar o formulário");
        res.redirect('/admin');
    })
})

// Fazer validação (IF)
router.post('/postagens/nova', (req, res) => {
    var erros = []

    // Busca o valor do envio do formulário 
    if(req.body.categoria == "0") {
        erros.push({texto: "Categoria Inválida, registre uma categoria"})
    }

    if(erros.length > 0) {
        res.render('admin/addpostagem', {erros: erros})
    } else {
        // pega os dados do formulário
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash('success_msg', "Postagem registrada com sucesso");
            res.redirect('/admin/postagens');
        })
        .catch((erro) => {
            console.error(erro); // Imprime o erro detalhado no console
            req.flash('error_msg', "Erro interno ao registrar nova postagem");
            res.redirect('/admin/postagens');
        });
    }
})

module.exports = router