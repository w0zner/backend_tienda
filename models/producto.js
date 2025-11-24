const mongoose = require('mongoose')

const ProductoSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    slug: {type: String, required: false},
    galeria: [{type: Object, required: false}],
    portada: {type: String, required: true},
    precio: {type: Number, required: true},
    descripcion: {type: String, required: true},
    contenido: {type: String, required: true},
    stock: {type: Number, required: true},
    nventas: {type: Number, required: false, default: 0},
    npuntos: {type: Number, required: false, default: 0},
    categoria: {type: String, required: true},
    variedades: [{type: Object, required: false}],
    titulo_variedad: {type: String, required: false},
    estado: {type: String, default:'Edicion', enum: ['Edicion', 'Activo', 'Inactivo', 'Agotado'], required: true},
    createdAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model('producto', ProductoSchema)