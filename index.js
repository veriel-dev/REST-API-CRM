import { Server } from "./server/server.js";
import * as dotenv from "dotenv";
dotenv.config();
new Server().listen();
