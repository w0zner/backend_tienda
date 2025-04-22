const Model = require('../models/config')
const messages = require('../helpers/responseMessages');
const fs = require('fs')
const path = require('path')

const listar = async (req, res) => {
    try {
        const config = await Model.find();

        res.json({data: config})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message}) 
    }
}

const obtenerConfig = async (req, res) => {
    try {
        const existe = await Model.findOne()

        res.json({data: existe})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const guardar = async (req, res) => {
    try {
        const existe = await Model.findOne()

        if(!existe) {
            const config = await Model.create({
                categorias: [],
                titulo: 'Createx',
                logo: 'logo.jpg',
                serie: '001',
                correlativo: '0000001'
            })
    
            res.json({data: config})
        } else {
            res.status(500).json({message: 'Ya existe una configuración creada'})
        }


    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const actualizar = async (req, res) => {
    try {
        const config= await Model.findOne()
        const object=req.body

        let actualizado=null
        if(req.files){
            const image_path= archivo.path

            const separator = path.sep;
            const name = image_path.split(separator)

            const logo_name= name[name.length-1]
            

            actualizado= await Model.findByIdAndUpdate(config._id, {
                categorias: object.categorias,
                titulo: object.titulo,
                logo: logo_name,
                serie: object.serie,
                correlativo: object.correlativo
            })

            fs.stat('../uploads/configuraciones' + actualizado.logo, function(err){
                        if(!err){
                            fs.unlink('../uploads/configuraciones' + actualizado.logo, (err)=> {
                                if(err) throw err;
                            })
                        }
                    })
        } else {
            actualizado= await Model.findByIdAndUpdate(config._id, {
                categorias: object.categorias,
                titulo: object.titulo,
                serie: object.serie,
                correlativo: object.correlativo
            })
        }

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


module.exports = {listar, obtenerConfig, guardar, actualizar, eliminar}