// Puxando módulo de Soma
var SomaFunc = require("./funções/soma")
console.log("Soma: " + SomaFunc(1,2))

// Puxando módulo de Subtração
var SubFunc = require("./funções/sub")
console.log("subtração: " + SubFunc(3,2))

// Puxando módulo de Divisão
var DivFunc = require("./funções/div")
console.log("Divisão: " + DivFunc(2,2))

// Puxando módulo de Multiplicação
var MultiFunc = require("./funções/multi")
console.log("Multiplicação: " + MultiFunc(5,5))