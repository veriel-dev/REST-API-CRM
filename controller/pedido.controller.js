import { validationResult } from "express-validator";
import Pedido from "../models/pedido.model.js";
const crearPedido = async (req, res) => {
  // Errores de valiación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const pedido = new Pedido(req.body);
    await pedido.save();
    res.json({
      ok: true,
      pedido,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate("cliente").populate({
      path: "pedido.producto",
      model: "Producto",
    });
    res.json({
      ok: true,
      pedidos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
const obtenerPedidoPorId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  try {
    const pedido = await Pedido.findById({ _id: id })
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Producto",
      });
    if (!pedido) {
      return res.status(404).json({
        ok: false,
        msg: "El pedido no existe en la base de datos",
      });
    }
    res.json({
      ok: true,
      pedido,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
const actualizarPedido = async (req, res) => {
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  try {
    const pedido = await Pedido.findById({ _id: id })
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Producto",
      });
    if (!pedido) {
      return res.status(404).json({
        ok: false,
        pedido,
      });
    }
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      {
        _id: id,
      },
      req.body,
      { new: true }
    )
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Producto",
      });
    res.json({
      ok: true,
      pedido: pedidoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
const eliminarPedido = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  try {
    const pedido = await Pedido.findByIdAndDelete({ _id: id });
    if (!pedido) {
      return res.status(404).json({
        ok: false,
        msg: "El pedido no existe en la base de datos",
      });
    }
    res.json({
      ok: true,
      msg: `Pedido con identificador ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
export {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  actualizarPedido,
  eliminarPedido,
};
