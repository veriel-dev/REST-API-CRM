import mongoose from "mongoose";

const Productoschema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
  },
});

export default mongoose.model("Producto", Productoschema);
