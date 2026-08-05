import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import taskRouter from "./routes/task.route.js"

const app=express();

app.use(cors({
     origin:process.env.CORS_ORIGIN,
     credentials:true
}));


app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));

app.use(cookieParser());


//This is the place for routes

app.use("/api/v1/tasks",taskRouter);

app.use((req,res)=>{
    res.status(404).json({success:false,message:`Route ${req.method} ${req.originalUrl} not Found`})
});


app.use((err,req,res,next)=>{
    const errorStatus=err.status ?? 500;
    res.status(errorStatus).json({success:false,message:err.message ?? "Internal Server Error"});
});

export default app;





