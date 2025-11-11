import app from "./app.js";
import { env } from "./constent.js";
import connectDB from "./db/db.js";

const PORT = env.PORT || 3000

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })