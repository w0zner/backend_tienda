const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventarioSchema = new Schema({
    producto: {type: Schema.Types.ObjectId, ref: 'producto'},
    cantidad: {type: Number, default: 0},
    usuario: {type: Schema.Types.ObjectId, ref: 'usuario'},
    proveedor: {type: String},
    motivo: {type: String},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('inventario', InventarioSchema);