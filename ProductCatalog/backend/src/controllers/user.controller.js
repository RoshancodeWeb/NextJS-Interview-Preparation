import ApiError from "../utils/apierror.util.js";
import User from "../models/user.model.js"

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: "strict"
}

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        if (!name || !email || !password) {
            throw new ApiError(400, 'All Fields Are Required');
        }

        if (password !== confirmpassword) {
            throw new ApiError(400, 'Password Should Match The Confirm Password');
        }

        const userAlreadyPresent = await User.findOne({ email: email });

        if (userAlreadyPresent) {
            throw new ApiError(400, 'User Already Exist Please Login');
        }


        const newUser = await User.create({ name, email, password });

        res.status(201).json({ success: true, data: newUser, message: "User Created Successfully" });

    } catch (error) {
        next(error);
    }

}


export const verifyAndSignIn = () => async (req, res, next) => {
    //read the user sended data
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(400, "Please Fill All The Fields");
        }
        //find user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }

        const passwordCorrect = await user.verfiyPassword(password);

        if (!passwordCorrect) {
            throw new ApiError(401, "Invalid Credentials");
        }


        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return res
            .status(200)
            .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
            .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .json({ success: true, data: user, message: "Logged in successfully" });

    } catch (error) {
       next(error);
    }
}