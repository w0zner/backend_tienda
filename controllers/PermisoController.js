const Permiso = require('../models/permiso');

const create = async (req, res) => {
    try {
        const data = req.body
        const permiso = await Permiso.create(data)
        res.status(200).json({data: permiso})
    } catch(error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
}

const findAll = async (req, res) => {
    try {
        const permisos = await Permiso.find().sort('key')
        res.status(200).json({data: permisos})
    } catch(error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
}

const findOne = async (req, res) => {
    try {
        const permiso= await Permiso.findById(req.params.id)
        res.status(200).json({data: permiso})
    } catch(error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const permiso= await Permiso.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({data: permiso})

    } catch(error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
}

const eliminar = async (req, res) => {
    try {
        await Permiso.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch(error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    eliminar
}