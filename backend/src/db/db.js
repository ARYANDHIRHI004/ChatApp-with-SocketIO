import mongoose from "mongoose";
import { DB_NAME, env } from "../constent.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB conneted successfully ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(error)

    }
}
export default connectDB
