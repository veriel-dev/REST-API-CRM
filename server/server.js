import express, { urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";

import { clienteRouter } from "../routes/index.js";
import { dbConnect } from "../config/db.js";
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.middlewares();
    this.routes();
    this.dbConnection();
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use((req, res, next) => {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      if (ip !== process.env.IP_PUBLIC) {
        return res
          .status(401)
          .send("No estás autorizado para acceder a esta página");
      }
      next();
    });
    this.app.use(cors());
  }
  routes() {
    this.app.use("/api", clienteRouter);
  }
  async dbConnection() {
    await dbConnect();
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port: http://localhost:${this.port}`);
    });
  }
}

export { Server };
