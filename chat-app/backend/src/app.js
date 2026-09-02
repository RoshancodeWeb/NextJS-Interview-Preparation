import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from './routes/user.route.js'

import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());


app.use("/api/v1/user",userRouter);

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({ success: true, message: "ok", at: new Date().toISOString() });
});

// nothing above matched
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} Not Found`
    });
});

// must be last
app.use(errorHandler);

export default app;
