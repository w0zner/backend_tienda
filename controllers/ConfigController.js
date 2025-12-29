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
                establecimiento: '001',
                punto: '001',
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
        const archivo = req.files?.logo;

        let actualizado=null
        if(archivo){
            const image_path= archivo.path

            const separator = path.sep;
            const name = image_path.split(separator)

            const logo_name= name[name.length-1]
            console.log(JSON.stringify(object));
            actualizado= await Model.findByIdAndUpdate(config._id, {
                categorias:  JSON.parse(object.categorias),
                titulo: object.titulo,
                logo: logo_name,
                establecimiento: object.establecimiento,
                punto: object.punto,
                correlativo: object.correlativo,
                color: object.color
            })

            fs.stat('../backend/uploads/configuraciones/' + config.logo, function(err){
                console.log(err)
                console.log(config.logo)
                        if(!err){
                            fs.unlink('../backend/uploads/configuraciones/' + config.logo, (err)=> {
                                console.log(err)
                                if(err) throw err;
                            })
                        }
                    })
        } else {
            actualizado= await Model.findByIdAndUpdate(config._id, {
                categorias: JSON.parse(object.categorias),
                titulo: object.titulo,
                establecimiento: object.establecimiento,
                punto: object.punto,
                correlativo: object.correlativo,
                color: object.color
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

const obtenerLogo = (req, res) => {
    try {
        const img_name = req.params['img']
        console.log(img_name)

        fs.stat('./uploads/configuraciones/' + img_name, (err)=> {
            if(!err) {
                const path_img = './uploads/configuraciones/' + img_name
                res.status(200).sendFile(path.resolve(path_img))
            } else {
                res.status(404).send(null)
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}


module.exports = {listar, obtenerConfig, guardar, actualizar, eliminar, obtenerLogo}