const Model = require('../models/config')
const messages = require('../helpers/responseMessages');

const listar = async (req, res) => {
    try {
        const config = await Model.find();

        res.json({data: config})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message}) 
    }
}

const obtenerPorId = async (req, res) => {
    try {
        const id = req.params.id
        const config = await Model.findById(id)

        res.json({data: config})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const guardar = async (req, res) => {
    try {
        const object = req.body
        const config = new Model(object)

        await config.save()

        res.json({data: config})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const actualizar = async (req, res) => {
    try {
        const id= req.params.id
        const object=req.body
        const actualizado= await Model.findByIdAndUpdate(id, object, {new: true})

        res.json({data: actualizado})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const eliminar = async (req, res) => {
    try {
        const id= req.params.id
        const objetoEliminado = await Model.findByIdAndDelete(id)
        if(!objetoEliminado) {
            res.status(404).json({message: messages.config.NOT_FOUND})
        } else {
            res.json({message: messages.genericMessage('remove', 'configuración')})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}


module.exports = {listar, obtenerPorId, guardar, actualizar, eliminar}