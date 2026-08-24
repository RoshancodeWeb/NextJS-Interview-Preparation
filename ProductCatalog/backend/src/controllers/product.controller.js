import ApiError from "../utils/apierror.util.js";
import Product from "../models/product.model.js"
import fs from "fs"

export const createProduct=async(req,res,next)=>{
  try {

    const {productName,productStock}=req.body;

    const localFilePath=req.file?.path;
    if(!localFilePath){
        throw new ApiError(400,"Product Image Is Required");
    }

    const dbImagePath=`temp/${req.file.filename}`;

    const product=await Product.create({productName,productStock,productImage:dbImagePath,owner:req.user._id});
    res.status(200).json({message:"Product Created Successfully",success:true,data:product});

    
  } catch (error) {
    if(req.file && req.file.path){
        fs.unlink(req.file.path,(err)=>{
            if (err) console.error("Failed to delete local image after DB error:", err);
        });
    }
    next(error);
  }
}


export const getProducts=async(req,res,next)=>{
  try {
    const userId=req.user._id;
    const products=await Product.find({owner:userId}).sort({createdAt:-1});
    res.status(200).json({success:true,message:"Users Product Fetched Successfully",data:products});    
    
  } catch (error) {
     next(error);
  }
}


