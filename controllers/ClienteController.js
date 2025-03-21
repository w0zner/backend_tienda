const Cliente =  require('../models/cliente');
const Rol = require('../models/rol');

const guardar = async (req, res) => {
    try {
        const data = req.body;

        let existeCliente = [];
        existeCliente = await Cliente.find({$or: [{cedula: data.cedula}, {email: data.email}]})

        if(existeCliente.length == 0) {
            const rol =  await Rol.findOne({nombre: req.body.rol})

            req.body.rol = rol._id;

            const cliente = await Cliente.create(req.body);
            res.status(200)
            .json({
                data: cliente
            })
        } else {
            res.status(200)
            .json({
                message: 'El cliente ya existe en la base de datos',
                data: undefined
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
}

module.exports = {
    guardar
}