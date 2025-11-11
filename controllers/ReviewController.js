const Review = require("../models/review");

const obtenerPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findById(id);

    res.json({ data: review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error " + error.message });
  }
};

const obtenerPorVentaProducto = async (req, res) => {
  try {
    const venta = req.params.venta;
    const producto = req.params.producto;

    const review = await Review.find({ venta: venta, producto: producto }).sort(
      { createdAt: -1 },
    );

    res.json({ data: review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error " + error.message });
  }
};

const guardar = async (req, res) => {
  try {
    const body = req.body;

    const review = await Review.create(body);

    res.status(200).json({ data: review });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error " + error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const review = await Review.findByIdAndUpdate(id, body, { new: true });

    res.status(200).json({ data: review });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error " + error.message,
    });
  }
};

module.exports = { obtenerPorId, guardar, obtenerPorVentaProducto, update };
