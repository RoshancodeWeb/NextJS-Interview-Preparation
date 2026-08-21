import mongoose from "mongoose"

const productSchema=new mongoose.Schema({
 
    productName:{
        type:String,
        required:[true,"Product is Required"],
        minLength:[4,"Name should be greater than 3 charactres"],
        trim:true
    },
    productStock:{
        type:Number,
        required:[true,"Product Stock Is Required"],
        min:[0,"Product Stock Cannot Be Zero"],
        validate:{
            validator:Number.isInteger,
            message:`{VALUE} is Not An Integer , Please Send Integer`
        },
        default:0,
    },
    productImage:{
        type:String,
        required:[true,"Product Image is Required"]
    },
    owner:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User",
       required:[true,"Owner Id is required"]
    }
});

productSchema.set("toJSON",{
    transform:(doc,ret)=>{
         delete ret.owner;
         delete ret.__v;
         return ret;
    }
})

const Product=mongoose.model("Product",productSchema);

export default Product