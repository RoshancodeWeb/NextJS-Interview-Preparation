import mongoose from "mongoose"

const messageSchema=new mongoose.Schema({
    conversationId:{
        type:String,
        required:true,
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
        required:[true,"Message Is Required"],
        trim:true,
        maxLength:[500,"Message too Long"]
    }
},{timestamps:true});

messageSchema.index({conversationId:1,createdAt:-1});

export const Message=mongoose.model("Message",messageSchema);
