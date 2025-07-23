'use strict'

const mongoose = require('mongoose');

const verificacionCuentaUsuarioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario' },
  token: String,
  expiresAt: Date,
  usado: { type: Boolean, default: false }
});

module.exports = mongoose.model('verificacionCuentaUsuario', verificacionCuentaUsuarioSchema);
