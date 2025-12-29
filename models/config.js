const mongoose = require('mongoose')

const categoriaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    icono: { type: String, required: true },
  });

const ConfigSchema = new mongoose.Schema({
    categorias: [{type: Object, required: true}],
    titulo: {type: String, required: true},
    logo: {type: String, required: true},
    establecimiento: {type: String, required: true},
    punto: {type: String, required: true},
    correlativo: {type: String, required: true},
    color:{type: String, default: '#3b506c'},
})

module.exports = mongoose.model('config', ConfigSchema)