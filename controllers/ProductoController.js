const Model = require('../models/producto')
const messages = require('../helpers/responseMessages');
const multiparty = require('connect-multiparty')

const listar = async (req, res) => {
    try {
        const productos = await Model.find();

        res.json({data: productos})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message}) 
    }
}

const obtenerPorId = async (req, res) => {
    try {
        const id = req.params.id
        const producto = await Model.findById(id)

        res.json({data: producto})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const guardar = async (req, res) => {
    try {
       
        const campos = req.body;
        const archivo = req.files.portada;
      
        console.log('Campos:', campos);
        console.log('Archivo:', archivo);
       
        const portada = req.file;
        
        const object = campos
        campos.portada = archivo.name
        const producto = new Model(object)

        await producto.save()

        res.json({data: producto})
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
            res.status(404).json({message: messages.producto.NOT_FOUND})
        } else {
            res.json({message: messages.genericMessage('remove', 'producto')})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}


module.exports = {listar, obtenerPorId, guardar, actualizar, eliminar}