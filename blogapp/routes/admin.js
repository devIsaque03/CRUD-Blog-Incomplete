const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model("categorias")

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

module.exports = router