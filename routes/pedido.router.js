import express from "express";
const router = express.Router();
import { body, param } from "express-validator";
import {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  eliminarPedido,
} from "../controller/pedido.controller.js";
/** Crear un pedido **/
router.post(
  "/pedidos",
  [
    body(
      "cliente",
      "El cliente es obligatorio y debe ser un ID válido de Mondodb"
    )
      .notEmpty()
      .isMongoId(),
  ],
  crearPedido
);
/** Obtener todos los pedidos **/
router.get("/pedidos", obtenerPedidos);
/** Obtener un pedido por ID **/
router.get(
  "/pedidos/:id",
  param("id", "El id es obligatorio y debe ser un mongo Id")
    .isMongoId()
    .notEmpty(),
  obtenerPedidoPorId
);
/** Actualizar un pedido por Id **/
router.put(
  "/pedidos/:id",
  [
    body(
      "cliente",
      "El cliente es obligatorio y debe ser un ID válido de Mondodb"
    )
      .notEmpty()
      .isMongoId(),
    param("id", "El id es obligatorio y debe ser un mongo Id")
      .isMongoId()
      .notEmpty(),
  ],
  obtenerPedidoPorId
);

/** Eliminar un pedido por ID **/
router.delete(
  "/pedidos/:id",
  [param("id", "El id es obligatorio y debe ser un mongo Id")],
  eliminarPedido
);

export { router as pedidoRouter };
