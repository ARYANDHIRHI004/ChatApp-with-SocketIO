import express from "express";
import cors from "cors"
import { env } from "./constent.js";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [''],
    credentials: true,
}))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.json({
        name: "Aryan Dhirhi"
    })
})


export default app
