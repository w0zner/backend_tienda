const mongoose = require('mongoose')


const CuponSchema = new mongoose.Schema({
    codigo: {type: String, required: true},
    tipo: {type: String, required: true},
    valor: {type: Number, required: true},
    limite: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('cupon', CuponSchema)