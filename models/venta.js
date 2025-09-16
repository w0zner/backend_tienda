'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const VentaSchema = Schema({
    usuario: {type: Schema.Types.ObjectId, ref: 'usuario'},
    nventa: {type: String},
    subtotal: {type: Number, default: 0},
    envio_titulo: {type: String},
    envio_precio: {type: Number, default: 0},
    transaccion: {type: String},
    cupon: {type: String},
    estado: {type: String},
    direccion: {type: Schema.Types.ObjectId, ref: 'direccion'},
    nota: {type: String},
    createdAt: {type: Date, default: Date.now, require: true}
})

module.exports = mongoose.model('venta', VentaSchema)