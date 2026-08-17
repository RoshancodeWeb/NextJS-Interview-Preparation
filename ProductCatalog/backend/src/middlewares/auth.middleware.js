import ApiError from "../utils/apierror.util.js"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const verifyJWT = async (req, res, next) => {

    try {
        const token = req.cookies?.accessToken;
        if (!token) {
            // No access cookie at all. The refresh cookie may still be alive,
            // so this is also worth a refresh attempt — hence a code.
            throw new ApiError(401, "No Access Token", "NO_TOKEN");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) throw new ApiError(401, "Unauthorized User");
        req.user = user;

        next();

    } catch (error) {
        //But there's a rule to follow on the frontend
        // Only attempt a refresh on TokenExpiredError. Never on JsonWebTokenError.
        if (error.name === "TokenExpiredError") {
            return next(new ApiError(401, "Access Token Expired", "TOKEN_EXPIRED"));
        }
        if (error.name === "JsonWebTokenError") {
            return next(new ApiError(401, "Invalid Access Token", "INVALID_TOKEN"));
        }
        next(error);
    }

}