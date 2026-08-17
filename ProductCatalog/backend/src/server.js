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



process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});

