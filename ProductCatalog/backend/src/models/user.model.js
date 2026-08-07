import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim: true,
        maxLength: [50, "Name Cannot Be Greater Than 50 Characters"]
    },
    email: {
        type: String,
        required: [true, "Email Is Required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "The Password Should Be of Atleast Characters"],
        // validate: {
        //     validator: function (v) {
        //         // Requires at least 1 uppercase, 1 lowercase, 1 number, and 1 special character
        //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
        //     },
        //     message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
        // }
        select:false
    },
    refreshToken:{
        type:String,
        default:null
    }
});

userSchema.pre("save",async function(next){
     if(!this.isModified("password")){
        return next();
     }

     try {
        const saltRounds=10;
        this.password=await bcrypt.hash(this.password,saltRounds);
     } catch (error) {
        next(error);
     }
});

const User = mongoose.model("User", userSchema);

export default User;