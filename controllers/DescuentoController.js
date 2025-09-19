const Descuento = require('../models/descuento')

const registrarDescuento = async (req, res) => {
    try {
        if(req.user){
            let data = req.body

            const img_path= req.files.banner.path;
            const name= img_path.split('\\')
            const banner_name= name[2]

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

const obtenerPortada = (req, res) => {
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

const eliminar = async (req, res) => {
    try {
        const id= req.params.id
        const objetoEliminado = await Descuento.findByIdAndDelete(id)
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

module.exports = {
    registrarDescuento,
    listarDescuentos,
    obtenerPortada,
    obtenerPorId,
    eliminar
}