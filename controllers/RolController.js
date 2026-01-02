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
        const { nombre, permisos } = req.body;

        const rol = await Rol.create({ nombre, permisos })

        res.status(200).json({ data: rol })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
}

const findOne = async (req, res) => {
    try {
        const rol= await Rol.findById(req.params.id).populate('permisos')
        res.status(200).json({data: rol})
    } catch(error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const rol= await Rol.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({data: rol})

    } catch(error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
}

module.exports = {
    listar,
    guardar,
    findOne,
    update
}