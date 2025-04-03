const Cupon = require('../models/cupon')
const moment = require('moment')

const listar = async (req, res) => {
    try {
        const cupones = await Cupon.find()

        res.json({data: cupones})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }    
}

const obtenerPorId = async (req, res) => {
    try {
        const id = req.params.id
        const cupon = await Cupon.findById(id)

        res.json({data: cupon})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const guardar = async (req, res) => {
    try {
        const object = req.body
        object.createdAt = moment().format('YYYY-MM-DD')
        console.log(object)
        const cupon = new Cupon(object)

        //const cupon = 
        await cupon.save()

        res.json({data: cupon})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const actualizar = async (req, res) => {
    try {
        const id= req.params.id
        const object=req.body
        const actualizado= await Cupon.findByIdAndUpdate(id, object, {new: true})

        res.json({data: actualizado})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const eliminar = async (req, res) => {
    try {
        const id= req.params.id
        const objetoEliminado = await Cupon.findByIdAndDelete(id)
        if(!objetoEliminado) {
            res.status(404).json({message: 'No se encontró el cuón'})
        } else {
            res.json({message: 'Cupón eliminado con exito!'})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

module.exports = { listar, obtenerPorId, guardar, actualizar, eliminar }