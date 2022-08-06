import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from './routers/userRouters.js';
import urlsRouters from './routers/urlsRouters.js'

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(userRouter)
server.use(urlsRouters)

const PORT = process.env.PORT
server.listen(PORT, () => console.log("Server in process"))