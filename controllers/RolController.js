const Rol = require('../models/rol');

const listar = async (req, res) => {
    try {
        const roles = await Rol.find();
        res.json({data: roles})
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
}

const guardar = async (req, res) => {
    try {
        const body = req.body

        const rol = await Rol.create(body)

        res.status(200).json({ data: rol})
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
}

module.exports = {
    listar,
    guardar
}