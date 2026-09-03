import "dotenv/config";
import app from "./app.js";
import { Server } from "socket.io"
import { registerSocketHandlers } from "./socket/index.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT ?? 5000;

/**
 * app.listen() creates a Node http.Server internally and RETURNS it. Holding
 * that return value is what matters later — Socket.IO attaches to the server,
 * not to the Express app:
 *
 *     const io = new Server(server, { cors: { ... } });
 */


connectDB()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`HTTP  →  http://localhost:${PORT}`);
        });

        const io = new Server(server, {
            cors: {
                origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
                credentials: true,
            }
        });

        registerSocketHandlers(io);


    })
    .catch((error)=>{
        console.log('Failed To Connect To Db :',error.message);
        process.exit(1);
    });
    









// Last-resort nets for anything that never reached a request handler — a throw
// inside a timer, a promise nobody awaited. Express cannot see those.
process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled rejection:", err);
    process.exit(1);
});
