import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

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
        minLength: [8, "The Password Should Be of Atleast 8 Characters"],
        validate: {
            validator: function (v) {
                // Requires at least 1 uppercase, 1 lowercase, 1 number, and 1 special character
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(v);
            },
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
        },
        select: false
    },
    refreshToken: {
        type: String,
        default: null
    }
});

userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password;
        delete ret.refreshToken;
        delete ret.__v;
        return ret;
    }
})


// We removed next because Mongoose doesn't hand it to async hooks in the first place — when your middleware is declared async, Mongoose watches the promise it returns instead of waiting for a callback, so the next parameter is simply undefined and any call to it is a TypeError. The two styles are alternatives, not partners: with a callback hook you say "I'm finished" by calling next() and "I failed" by calling next(error); with an async hook you say those same two things by returning and by throwing. Since your function was already async, the promise was always the real signal — the next calls were a second, broken mechanism layered on top, dormant only because the branches containing them happened never to run. Dropping next leaves one channel with two clear outcomes: return to continue, throw to abort.
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);

});


userSchema.methods.verifyPassword=async function(plainPassword){
   if(!this.password){
     throw new Error("Password not loaded — query with .select('+password')");
   }
   return bcrypt.compare(plainPassword,this.password);
}

userSchema.methods.generateAccessToken=function(){
   return jwt.sign(
   {_id:this._id,email:this.email,name:this.name},
   process.env.ACCESS_TOKEN_SECRET,
   {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
   );
}

userSchema.methods.generateRefreshToken=function(){
   return jwt.sign(
   {_id:this._id},
   process.env.REFRESH_TOKEN_SECRET,
   {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
   );
}



const User = mongoose.model("User", userSchema);

export default User;