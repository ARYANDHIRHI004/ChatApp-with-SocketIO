import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

export const env = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    ORIGIN: process.env.ORIGIN,
}

export const DB_NAME = "ChatApp"