const mongoose = require('mongoose');

const PermisoSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('permiso', PermisoSchema);
