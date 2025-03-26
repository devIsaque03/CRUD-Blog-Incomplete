const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Usuario');
const Usuario = mongoose.model('usuarios');

// Rota GET para renderizar o formulário de registro
router.get('/registro', (req, res) => {
    res.render('usuario/registro');
});