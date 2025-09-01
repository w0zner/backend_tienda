const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarritoSchema = new Schema({
    producto: {type: Schema.Types.ObjectId, ref: 'producto'},
    usuario: {type: Schema.Types.ObjectId, ref: 'usuario'},
    cantidad: {type: Number, default: 0},
    variedad: {type: String},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('carrito', CarritoSchema);