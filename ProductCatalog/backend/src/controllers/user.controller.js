import ApiError from "../utils/apierror.util.js";
import User from "../models/user.model.js"

export const createUser = async (req, res,next) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        if (!name || !email || !password) {
            throw new ApiError(400,'All Fields Are Required');
        }
        
        if(password!==confirmpassword){
            throw new ApiError(400,'Password Should Match The Confirm Password');
        }
 
        

        const newUser=await User.create({name,email,password});

        res.status(200).json({success:true,data:newUser,message:"User Created Successfully"});

    } catch (error) {
        next(error);
    }

}