const Model = require('../models/producto')
const Inventario = require('../models/inventario')
const messages = require('../helpers/responseMessages');
const fs = require('fs')
const path = require('path')
const os = require('os');
const multiparty = require('connect-multiparty');

const listar = async (req, res) => {
    console.info("Hola")
    try {
        const filtro= req.params['filtro']

        let productos=null
        if(filtro) {
            productos = await Model.find({titulo: new RegExp(filtro, 'i')});
        } else {
            productos = await Model.find();
        }      

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

        const image_path= archivo.path

        const separator = path.sep;
        const name = image_path.split(separator)

        
        const portada_name= name[name.length-1]
        console.log(image_path)
        console.log(name)
        console.log(portada_name)
        campos.slug=campos.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g, '')

      
        console.log('Campos:', campos);
        console.log('Archivo:', archivo);
        
        const object = campos
        campos.portada = portada_name
        const producto = new Model(object)

        const productoGuardado = await producto.save()

        let inventario = new Inventario({
            producto: productoGuardado._id,
            proveedor: 'Tienda',
            cantidad: object.stock,
            usuario: req.user.sub,
            motivo: 'COMPRA'
        })

        await inventario.save()

        res.json({data: productoGuardado, inventario: inventario})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const actualizar = async (req, res) => {
    try {
        const id= req.params.id

        const campos = req.body;
        const archivo = req.files.portada;

        if(archivo) {
            const image_path= archivo.path

            const separator = path.sep;
            const name = image_path.split(separator)

            const portada_name= name[name.length-1]
            console.log(image_path)
            console.log(name)
            console.log(portada_name)
            console.log('Archivo:', archivo);
            campos.portada = portada_name
        }
        
        campos.slug=campos.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g, '')

      
        console.log('Campos:', campos);
        
        const object = campos
        const actualizado= await Model.findByIdAndUpdate(id, object, {new: true})

        fs.stat('../uploads/productos' + campos.portada, function(err){
            if(!err){
                fs.unlink('../uploads/productos' + campos.portada, (err)=> {
                    if(err) throw err;
                })
            }
        })

        res.json({dato: actualizado})
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

const obtenerPortada = (req, res) => {
    try {
        const img_name = req.params['img']
        console.log(img_name)

        fs.stat('./uploads/productos/' + img_name, (err)=> {
            if(!err) {
                const path_img = './uploads/productos/' + img_name
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

const agregar_imagen_galeria = async (req, res) => {
    try {
        console.log('subir imagen')
        const id= req.params.id
        const  data= req.body
        console.log(data)
        const image_path= req.files.imagen.path
        console.log(image_path)

        const separator = path.sep;
        const name = image_path.split(separator)

        const imagen_name= name[name.length-1]
        console.log(imagen_name)

        const reg = await Model.findByIdAndUpdate({_id: id}, {$push: {galeria: {
            imagen: imagen_name,
            id: data._id
        }}})

        res.json({data: reg})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const listar_inventario = async (req, res) => {
    try {
        const id = req.params.id
        const lista = await Inventario.find({producto: id}).populate('usuario') 
        console.log(req.user)
        console.log(lista)
        res.json({data: lista})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const eliminar_item_inventario = async (req, res) => {
    try {
        const id = req.params.id;
        const registro = await Inventario.findByIdAndDelete({_id: id})

        const producto = await Model.findById(registro.producto)
        console.log(producto)
        console.log(registro.cantidad)
        const nuevo_stock = parseInt(producto.stock) - parseInt(registro.cantidad)

        const actualizacion_producto = await Model.findByIdAndUpdate({_id: registro.producto}, {
            stock: nuevo_stock
        })

        res.status(200).json({data: actualizacion_producto})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const guardar_item_inventario = async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const item = new Inventario(data)

        await item.save()

        const producto = await Model.findById(item.producto)
        console.log(producto.stock)
        console.log(item.cantidad)
        const nuevo_stock = parseInt(producto.stock) + parseInt(item.cantidad)

        const actualizacion_producto = await Model.findByIdAndUpdate({_id: item.producto}, {
            stock: nuevo_stock
        })

        res.status(200).json({data: item, producto: actualizacion_producto})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const actualizarVariedades = async (req, res) => {
    try {
        const id= req.params.id
        const campos = req.body;
        console.log(id)
        console.log(campos)
        
        const actualizado= await Model.findByIdAndUpdate(id, {
            titulo_variedad: campos.titulo_variedad,            
            variedades: campos.variedades//JSON.parse(campos.variedades),
        })

        res.json({data: actualizado})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}


module.exports = { listar, obtenerPorId, guardar, actualizar, eliminar, obtenerPortada, listar_inventario, eliminar_item_inventario, guardar_item_inventario, actualizarVariedades, agregar_imagen_galeria }