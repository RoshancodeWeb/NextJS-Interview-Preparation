// Keep in mind that Express 5 auto handles the errors , there
// is no need for try catch ,but if we want to change the shape of the 
// error like the auth middleware we use it like in some of the controllers
// we are using in the controllers below to format the errors like API Error
import ApiError from "../utils/apierror.util.js";
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import durationToMs from "../utils/duration.util.js"

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: "strict"
}

/**
 * Both cookies live as long as REFRESH_TOKEN_EXPIRY.
 *
 * Note the access cookie deliberately does NOT use ACCESS_TOKEN_EXPIRY. If the
 * cookie died with the token, the browser would stop sending it, jwt.verify
 * would never run, and we'd never get a TokenExpiredError — so the refresh
 * flow could never trigger. Letting the cookie outlive the token makes the
 * JWT's own `exp` the single thing that decides.
 */
const REFRESH_COOKIE_MAX_AGE = durationToMs(process.env.REFRESH_TOKEN_EXPIRY, 7 * 24 * 60 * 60 * 1000);
const ACCESS_COOKIE_MAX_AGE = REFRESH_COOKIE_MAX_AGE;

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


export const verifyAndSignIn = async (req, res, next) => {
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

        const passwordCorrect = await user.verifyPassword(password);

        if (!passwordCorrect) {
            throw new ApiError(401, "Invalid Credentials");
        }


        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return res
            .status(200)
            .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: ACCESS_COOKIE_MAX_AGE })
            .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: REFRESH_COOKIE_MAX_AGE })
            .json({ success: true, data: user, message: "Logged in successfully" });

    } catch (error) {
        next(error);
    }
}


export const getCurrentUser = async (req, res, next) => {

    return res.status(200).json({ success: true, message: "User Fetched Successfully", data: req.user });

}


export const logoutUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { refreshToken: null });

        res
            .clearCookie("accessToken", { ...cookieOptions })
            .clearCookie("refreshToken", { ...cookieOptions })
            .status(200).json({ success: true, message: "User Logout Succcessfully" });


    } catch (error) {
        next(error);
    }

}

export const refreshTheSession = async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken;
        if (!token) {
            throw new ApiError(401, "Unauthorized User")
        }

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            throw new ApiError(401, "Unauthorized User");
        }

        if (user.refreshToken == token) {
            const accessToken = await user.generateAccessToken();
            const refreshToken = await user.generateRefreshToken();

            user.refreshToken = refreshToken;
            await user.save({ validateBeforeSave: false });
            return res.status(200)
                .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: ACCESS_COOKIE_MAX_AGE })
                .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: REFRESH_COOKIE_MAX_AGE })
                .json({ success: true, message: "Session Refreshed Successfully" });
        }

        throw new ApiError(401, "Unauthorized User");
    } catch (error) {
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return next(new ApiError(401, "Session expired, please log in again"));
        }
        next(error);
    }

}