const mongoose = require('mongoose')

const ConfigSchema = new mongoose.Schema({
    categoria: [{type: Object, required: true}],
    titulo: {type: String, required: true},
    logo: {type: String, required: true},
    serie: {type: Number, required: true},
    correlativo: {type: Number, required: true}
})

module.exports = mongoose.model('config', ConfigSchema)