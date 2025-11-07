const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    producto: {type: Schema.Types.ObjectId, ref: 'producto'},
    usuario: {type: Schema.Types.ObjectId, ref: 'usuario'},
    venta: {type: Schema.Types.ObjectId, ref: 'venta'},
    mensaje: {type: String},
    opcion: {type: String},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('review', ReviewSchema);