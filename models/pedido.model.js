import mongoose from "mongoose";

const Pedidoschema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Cliente",
  },
  pedido: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Producto",
      },
      cantidad: Number,
    },
  ],
  total: {
    type: Number,
  },
});

export default mongoose.model("Pedido", Pedidoschema);
