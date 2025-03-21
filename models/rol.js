'use strict'

const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true }
});

module.exports =  mongoose.model('rol', RolSchema);
