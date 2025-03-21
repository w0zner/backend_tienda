'use strict'

const mongoose = require('mongoose');


const UsuarioSchema = new mongoose.Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    pais: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    perfil: {type: String, default: 'perfil.png', required: true},
    telefono: {type: String, required: false},
    genero: {type: String, required: false},
    fecha_nacimiento: {type: String, required: false},
    cedula: {type: String, required: true, unique: true},
    rol: { type: mongoose.Schema.Types.ObjectId, ref: 'Rol', required: true} //relacion con rol
});

module.exports = mongoose.model('usuario', UsuarioSchema);