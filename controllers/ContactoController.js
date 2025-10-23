const Contacto = require('../models/contacto')

const enviar_mensaje = async (req, res) => {
    const data = req.body;

    data.estado='Abierto'
    const reg = await Contacto.create(data)
    res.send({data: reg})
}

const listar_mensajes = async (req, res) => {
    if(req.user){ 
        try {
            const reg = await Contacto.find().sort({createdAt: -1})
            res.send({data: reg})
        } catch(error) {
            console.log(error)
            res.status(500).send({message: 'Error del servidor'});
        }
    } else {
        res.status(500).send({message: 'NoAccess'});
    }
}

const resolver_mensaje = async (req, res) => {
    if(req.user){ 
        try {
            const id = req.params['id'];

            const reg = await Contacto.findByIdAndUpdate({_id: id}, {estado: 'Cerrado'});
            res.send({data: reg})
        } catch(error) {
            console.log(error)
            res.status(500).send({message: 'Error del servidor'});
        }
    } else {
        res.status(500).send({message: 'NoAccess'});
    }
}

module.exports = {
    enviar_mensaje,
    listar_mensajes,
    resolver_mensaje
}