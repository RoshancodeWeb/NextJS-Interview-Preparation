import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Required"],
        unique:true,
        trim:true,
        minLength:[5,"Name should comprise of minimum 5 characters"]
    }

})

const User=mongoose.model("User",userSchema);

export default User
