import mongoose from "mongoose"

export const connectDB=async()=>{
    const instance=await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`MongoDB connected: ${instance.connection.host}`);
}