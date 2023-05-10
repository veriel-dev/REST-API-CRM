import { request, response } from "express";
import Producto from "../models/producto.model.js";
import { validationResult } from "express-validator";
const crearProducto = async (req = request, res = response) => {
  const { nombre, precio } = req.body;
  if (!nombre || !precio) {
    return res.status(400).json({
      ok: false,
      msg: "El nombre y el precio son obligatorios",
    });
  }
  try {
    if (req.file) {
      req.body.imagen = req.file.filename;
    }
    const producto = await Producto.create(req.body);
    res.status(201).json({
      ok: true,
      producto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json({
      ok: true,
      productos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
const obtenerProductoPorId = async (req, res) => {
  //Errores de valiación
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      res.status(404).json({
        ok: false,
        msg: `No existe el producto en la BBDD`,
      });
    }
    res.status(200).json({
      ok: true,
      producto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

const actualizarProducto = async (req = request, res = response) => {
  //Errores de valiación
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  // Comprobación de si existe el cliente
  const { id } = req.params;
  const producto = await Producto.findById({ _id: id });
  if (!producto) {
    return res
      .status(404)
      .json({ ok: false, msg: "No existe producto con ese ID en la BBDD" });
  }

  try {
    if (req.file?.filename) {
      req.body.imagen = req.file.filename;
    } else {
      req.body.imagen = producto.imagen;
    }
    const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ ok: true, productoActualizado });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Hubo un error" });
  }
};
const eliminarProducto = async (req, res) => {
  // Errores de valiación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Comprobación de si existe el cliente
  const { id } = req.params;
  const producto = await Producto.findById({ _id: id });
  if (!producto) {
    return res
      .status(404)
      .json({ ok: false, msg: "No existe producto con ese ID en la BBDD" });
  }
  try {
    await Producto.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
      msg: `Producto ${producto.nombre} -  eliminado de forma correcta!!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Hubo un error" });
  }
};
export {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
};
