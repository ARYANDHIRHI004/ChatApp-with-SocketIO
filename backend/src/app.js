import express, { application } from "express";
import cors from "cors"
import { env } from "./constent.js";
import cookieParser from "cookie-parser";
import { createServer } from 'node:http';
import socketConnection from "./utils/sockets.js";

const app = express()

const server = createServer(app)
socketConnection(server)

app.use(cors({
    origin:["http://localhost:5173", "http://172.31.224.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))


app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/user", userRouter)


export default server
