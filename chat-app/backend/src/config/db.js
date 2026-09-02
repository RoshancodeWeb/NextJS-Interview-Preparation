import mongoose from "mongoose"

export const connectDB=async()=>{
    const instance=await mongoose.connect();
    console.log(`Db got Connected at : ${instance.connection.host}`);
}