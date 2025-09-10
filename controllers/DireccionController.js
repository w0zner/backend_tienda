const Direccion = require('../models/direccion')

const guardarDireccion = async (req, res) => {
    try {
        if(req.user){
            const data = req.body;

            if(data.principal) {
                let direcciones = await Direccion.find({usuario:data.usuario})

                direcciones.forEach(async element => {
                    await Direccion.findByIdAndUpdate({_id:element._id}, {principal: false})
                })
            }

            const reg = await Direccion.create(data);
            res.status(200).send({data: reg})
        }
    } catch(Exception) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const obtenerDireccionesPorUsuario = async (req, res) => {
    try {
        const id = req.params['id']
        const direcciones = await Direccion.find({usuario: id})

        res.status(200).send({data:direcciones})

    } catch(error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const actualizarEstadoDireccion = async (req, res) => {
    try {
        if(req.user){
            const id = req.params['id']

        const dir = await Direccion.findOne({_id:id})
        
        const direcciones = await Direccion.find({usuario: dir.usuario})

        direcciones.forEach(async element => {
            await Direccion.findByIdAndUpdate({_id:element._id}, {principal: false})
        })
        await Direccion.findByIdAndUpdate({_id:id}, {principal: true})
        //const reg = await Direccion.findOne({_id:id})
        res.status(200).send({data:true})
        }
    } catch(Exception) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

module.exports = {
    guardarDireccion,
    obtenerDireccionesPorUsuario,
    actualizarEstadoDireccion
}