'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DventaSchema = Schema({
    producto: {type: Schema.Types.ObjectId, ref: 'producto'},
    venta: {type: Schema.Types.ObjectId, ref: 'venta'},
    subtotal: {type: Number, default: 0},
    variedad: {type: String},
    cantidad: {type: Number, default: 1},
    createdAt: {type: Date, default: Date.now, require: true}
})

module.exports = mongoose.model('dventa', DventaSchema)