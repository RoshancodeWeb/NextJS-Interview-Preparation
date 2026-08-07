import "dotenv/config"
import app from "./app.js"
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT ?? 8000;


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on Port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Mongo Db Connection Failed", error.message);
        process.exit(1);
    })
