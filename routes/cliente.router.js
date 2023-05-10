import express from "express";
import {
  actualizarCliente,
  crearCliente,
  eliminarCliente,
  obtenerClientes,
  obtenerClientesPorId,
} from "../controller/cliente.controller.js";
import { body, param } from "express-validator";
const router = express.Router();

/**  Obtener todos los clientes **/
router.get("/clientes", obtenerClientes);
/** Crear un nuevo cliente **/
router.post(
  "/clientes",
  [
    body("nombre", "El nombre es obligatorio").notEmpty(),
    body("apellido", "El apellido es obligatorio").notEmpty(),
    body("empresa", "La empresa es obligatoria").notEmpty(),
    body("email", "Agrega un email válido").isEmail().notEmpty(),
    body("telefono", "El telefono es obligatorio y debe tener 9 dígitos")
      .notEmpty()
      .isLength(9),
  ],
  crearCliente
);
/** Obtener cliente por ID **/
router.get(
  "/clientes/:id",
  param("id", "El id es obligatorio y debe ser un mongo Id")
    .isMongoId()
    .notEmpty(),
  obtenerClientesPorId
);
/** Actualizar cliente por ID **/
router.put(
  "/clientes/:id",
  [
    body("nombre", "El nombre es obligatorio").notEmpty(),
    body("apellido", "El apellido es obligatorio").notEmpty(),
    body("empresa", "La empresa es obligatoria").notEmpty(),
    body("email", "Agrega un email válido").isEmail().notEmpty(),
    body("telefono", "El telefono es obligatorio y debe tener 9 dígitos")
      .notEmpty()
      .isLength(9),
    param("id", "El id es obligatorio y debe ser un mongo Id")
      .isMongoId()
      .notEmpty(),
  ],
  actualizarCliente
);
/** Eliminar cliente por ID **/
router.delete(
  "/clientes/:id",
  param("id", "El id es obligatorio y debe ser un mongo Id")
    .isMongoId()
    .notEmpty(),
  eliminarCliente
);

export { router as clienteRouter };
