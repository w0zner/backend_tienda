const Contacto = require('../models/contacto')

const enviar_mensaje = (req, res) => {
    const data = req.body;

    const reg = Contacto.create(data)
    res.send({data: reg})
}

module.exports = {
    enviar_mensaje
}