'use strict'

const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    permisos: [{type: mongoose.Schema.Types.ObjectId, ref: 'permiso'}],
    createdAt: {type: Date, default: Date.now}
});

module.exports =  mongoose.model('rol', RolSchema);
