import ApiError from "../utils/apierror.util.js"
import asyncHandler from "../utils/asynchandler.util.js"
import User from "../models/user.model.js"

export const createUser = asyncHandler(async (req, res) => {
    
        const { name } = req.body;
        if (!name.trim()) {
            throw new ApiError(400,"Name is Reqquired");
        }


        const user=await User.findOneAndUpdate(
            {name:name.trim().toLowerCase()},
            {$setOnInsert:{name:name.trim().toLowerCase()}},
            {upsert:true,new:true}
        );

        res.status(200).json({success:true,message:"User Created Successfully",user});
        
});