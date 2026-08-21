import express from 'express'
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"

import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app=express();

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

// This exposes the CONTENTS of the 'public' folder to the root URL
app.use(express.static("public"));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(cookieParser());


//Here we will define the routes
app.use("/api/v1/user",userRouter);
app.use("/api/v1/product",productRouter);

app.use((req,res)=>{
    console.log("Route Not Found");
    res.status(404).json({success:false,message:`Route ${req.method} ${req.originalUrl} Not Found`})
});

app.use(errorHandler);


export default app;


