'use strict'

const mongoose = require('mongoose');


const UsuarioSchema = new mongoose.Schema({
    cedula: {type: String, required: true, unique: true},
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    perfil: {type: String, default: 'perfil.png', required: true},
    telefono: {type: String, required: false},
    pais: {type: String, required: false},
    genero: {type: String, required: false},
    fecha_nacimiento: {type: String, required: false},
    rol: { type: mongoose.Schema.Types.ObjectId, ref: 'rol', required: true}, //relacion con rol
    verificado: { type: Boolean, default: false }
});

module.exports = mongoose.model('usuario', UsuarioSchema);