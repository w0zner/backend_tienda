const express = require("express");
const reviewController = require("../controllers/ReviewController");
const authenticate = require("../middlewares/authenticate");

const api = express.Router();

api.get(
  "/obtener-resenhas/:producto",
  authenticate.verifyAuth,
  reviewController.obtenerPorProducto
);
api.get(
  "/:venta/:producto",
  authenticate.verifyAuth,
  reviewController.obtenerPorVentaProducto,
);
api.get(
  "/:usuario",
  authenticate.verifyAuth,
  reviewController.obtenerPorUsuario
);

api.get("/:id", authenticate.verifyAuth, reviewController.obtenerPorId);
api.post("/", authenticate.verifyAuth, reviewController.guardar);
api.put("/:id", authenticate.verifyAuth, reviewController.update);
//api.delete('/:id', authenticate.verifyAuthAdmin, cuponController.eliminar)

module.exports = api;
