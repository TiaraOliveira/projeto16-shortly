import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from './routers/userRouters.js';


dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(userRouter)

const PORT = process.env.PORT
server.listen(PORT, () => console.log("Server in process"))