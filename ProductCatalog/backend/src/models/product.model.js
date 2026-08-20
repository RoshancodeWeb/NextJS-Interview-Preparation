import mongoose from "mongoose"

const productSchema=new mongoose.Schema({
 
    productName:{
        type:String,
        required:[true,"Product is Required"],
        minLength:[4,"Name should be greater than 3 charactres"],
        trim:true
    },
    

});