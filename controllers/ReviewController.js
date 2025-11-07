const Review = require('../models/review');

const obtenerPorId = async (req, res) => {
    try {
        const id = req.params.id
        const review = await Review.findById(id)

        res.json({data: review})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error '+error.message})
    }
}

const guardar = async (req, res) => {
    try {
        const body = req.body

        const review = await Review.create(body)

        res.status(200).json({ data: review})
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error ' + error.message
        })
    }
}

module.exports = { obtenerPorId, guardar }