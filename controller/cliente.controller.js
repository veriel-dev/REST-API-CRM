import { request, response } from "express";
import Cliente from "../models/cliente.model.js";
import { validationResult } from "express-validator";
const obtenerClientes = async (req = request, res = response) => {
  try {
    const clientes = await Cliente.find({});
    res.status(200).json({ ok: true, clientes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
const crearCliente = async (req = request, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  /** Validación de si existe el email ya registrado **/
  const { email } = req.body;
  const isExistEmail = await Cliente.findOne({ email });
  if (isExistEmail)
    return res
      .status(400)
      .json({ ok: false, msg: "El email ya está registrado" });
  const body = req.body;
  try {
    const cliente = await new Cliente(body);
    await cliente.save();
    res.status(200).json({
      ok: true,
      cliente,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Hubo un error" });
  }
};

const obtenerClientesPorId = async (req = request, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { id } = req.params;
  try {
    const cliente = await Cliente.findById(id);
    if (!cliente)
      return res.status(404).json({ ok: false, msg: "No existe el cliente" });
    res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Hubo un error" });
  }
};
const actualizarCliente = async (req = request, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  // Comprobación de si existe el cliente
  const { id } = req.params;
  const cliente = await Cliente.findById({ _id: id });
  if (!cliente) {
    return res
      .status(404)
      .json({ ok: false, msg: "No existe cliente con ese ID en la BBDD" });
  }
  // Control Email
  const { email } = req.body;
  if (email !== cliente.email) {
    const isExistUserEmail = Cliente.findOne({ email });
    if (isExistUserEmail) {
      return res
        .status(400)
        .json({ ok: false, msg: "El email ya está registrado en la BBDD" });
    }
  }
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ ok: true, clienteActualizado });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Hubo un error" });
  }
};
const eliminarCliente = async (req = request, res = response) => {
  //Errores de valiación
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  // Comprobación de si existe el cliente
  const { id } = req.params;
  const cliente = await Cliente.findById({ _id: id });
  if (!cliente) {
    return res
      .status(404)
      .json({ ok: false, msg: "No existe cliente con ese ID en la BBDD" });
  }
  try {
    await Cliente.findByIdAndDelete({ _id: id });
    res.status(200).json({
      ok: true,
      msg: `Cliente ${cliente.nombre} - ${cliente.apellido} eliminado de forma correcta!!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Hubo un error" });
  }
};
export {
  obtenerClientes,
  crearCliente,
  obtenerClientesPorId,
  actualizarCliente,
  eliminarCliente,
};
