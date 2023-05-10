import express from "express";

import { param } from "express-validator";
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../controller/producto.controller.js";
import uploadFile from "../config/configurationMulter.js";
const router = express.Router();

/**  Obtener todos los productos **/

router.get("/productos", obtenerProductos);

/**  Crear nuevo Producto **/
router.post("/productos", uploadFile, crearProducto);

/** Obtener porducto por Id */
router.get(
  "/productos/:id",
  param("id", "El id es obligatorio y debe ser un mongo Id")
    .isMongoId()
    .notEmpty(),
  obtenerProductoPorId
);
/** Actualizar un producto por ID **/
router.put(
  "/productos/:id",
  [
    param("id", "El id es obligatorio y debe ser un mongo Id")
      .isMongoId()
      .notEmpty(),
    uploadFile,
  ],
  actualizarProducto
);

/** Eliminar un producto por ID **/
router.delete(
  "/productos/:id",
  [
    param("id", "El id es obligatorio y debe ser un mongo Id")
      .isMongoId()
      .notEmpty(),
    uploadFile,
  ],
  eliminarProducto
);
export { router as productoRouter };
