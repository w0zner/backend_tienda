const Descuento = require('../models/descuento')
const fs = require('fs')
const path = require('path')
const os = require('os');
const multiparty = require('connect-multiparty');
const messages = require('../helpers/responseMessages');


const registrarDescuento = async (req, res) => {
    try {
        if(req.user){
            let data = req.body
            console.log(req.files.banner)

            const img_path= req.files.banner.path;
            const separator = path.sep;
            const name = img_path.split(separator)
            const banner_name= name[name.length - 1]

            data.banner= banner_name
            const reg= await Descuento.create(data)

            res.status(200).send({data: reg})
        }
    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const listarDescuentos = async (req, res) => {
    try {
        const filtro= req.params['filtro']

        let descuentos=null
        if(filtro) {
            descuentos = await Descuento.find({titulo: new RegExp(filtro, 'i')}).sort({createdAt: -1});
        } else {
            descuentos = await Descuento.find();
        }      

        res.json({data: descuentos})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message}) 
    }
}

const actualizarDescuento = async (req, res) => {
    try {
        const id= req.params.id

        const campos = req.body;
        const archivo = req.files?.banner;
        console.log(campos)
        console.log(archivo)

        if(archivo) {
            console.log(1)
            const image_path= archivo.path

            const separator = path.sep;
            const name = image_path.split(separator)
            const portada_name= name[name.length-1]

            console.log(image_path)
            console.log(name)
            console.log(portada_name)
            console.log('Archivo:', archivo);
            campos.banner = portada_name
        }
      
        console.log('Campos:', campos);
        
        const object = campos
        const actualizado= await Descuento.findByIdAndUpdate(id, object, {new: true})

        if(archivo) {
             fs.stat('../uploads/descuentos/' + campos.banner, function(err){
                if(!err){
                    fs.unlink('../uploads/descuentos/' + campos.banner, (err)=> {
                        if(err) throw err;
                    })
                }
            })
        }

        res.json({dato: actualizado})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const obtenerBanner = (req, res) => {
    try {
        const img_name = req.params['img']
        console.log(img_name)

        fs.stat('./uploads/descuentos/' + img_name, (err)=> {
            if(!err) {
                const path_img = './uploads/descuentos/' + img_name
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

const obtenerPorId = async (req, res) => {
    try {
        const id = req.params.id
        const descuento = await Descuento.findById(id)
        if(!descuento) {
            res.status(404).send({message: 'Descuento no encontrado', data: undefined})
        } else {
            res.status(200).send({data: descuento})
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const eliminarDescuento = async (req, res) => {
    try {
        const id= req.params.id
        const objetoEliminado = await Descuento.findByIdAndDelete(id)
        if(!objetoEliminado) {
            res.status(404).json({message: messages.producto.NOT_FOUND})
        } else {
            res.json({message: messages.genericMessage('remove', 'descuento')})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

module.exports = {
    registrarDescuento,
    listarDescuentos,
    actualizarDescuento,
    obtenerBanner,
    obtenerPorId,
    eliminarDescuento
}