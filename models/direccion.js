const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DireccionSchema = new Schema({
    usuario: {type: Schema.Types.ObjectId, ref: 'usuario'},
    destinatario: {type: String},
    cedula: {type: String},
    direccion: {type: String},
    numero_casa: {type: Number},
    pais: {type: String},
    departamento: {type: String},
    ciudad: {type: String},
    telefono: {type: String},
    principal: {type: Boolean},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('direccion', DireccionSchema);