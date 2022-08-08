import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from './routers/authRouter.js';
import urlsRouters from './routers/urlsRouter.js';
import usersRouters from './routers/userRouter.js';
import rankingRouter from './routers/rankingRouter.js'

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(authRouter)
server.use(urlsRouters)
server.use(usersRouters)
server.use(rankingRouter)

const PORT = process.env.PORT
server.listen(PORT, () => console.log("Server in process"))