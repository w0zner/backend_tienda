const mongoose = require('mongoose')

const ProductoSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    slug: {type: String, required: true},
    galeria: [{type: Object, required: false}],
    portada: {type: String, required: true},
    precio: {type: Number, required: true},
    descripcion: {type: String, required: true},
    contenido: {type: String, required: true},
    stock: {type: Number, required: true},
    nventas: {type: Number, required: true},
    npuntos: {type: Number, required: true},
    categoria: {type: Number, required: true},
    estado: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model('producto', ProductoSchema)