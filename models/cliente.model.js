import mongoose from "mongoose";

const Clienteschema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
  },
  empresa: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
});

export default mongoose.model("Cliente", Clienteschema);
