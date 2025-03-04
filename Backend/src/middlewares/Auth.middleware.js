// import { asyncHandler } from "../utils/asyncHandler.js";
// import { User } from "../modules/user.models.js";
// import { ApiError } from "../utils/apiErrors.js";
// import jwt from "jsonwebtoken";

// export const verifyJWT = asyncHandler(async (req, res, next) => {
//     try {
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
//         if (!token) {
//             throw new ApiError(401, "Unauthorized request");
//         }
    
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
//         const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
//         if (!user) {
//             throw new ApiError(401, "Invalid Access Token");
//         }
    
//         req.user = user;
//         next();
//     } catch (error) {
//         throw new ApiError(401,error?.message || "Invalid Tokens")
//     }
// })

import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../modules/user.models.js";
import { ApiError } from "../utils/apiErrors.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        let token;
        if (req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
        } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        if (!decodedToken || !decodedToken._id) {
            throw new ApiError(401, "Invalid Access Token");
        }
    
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    
        if (!user) {
            throw new ApiError(401, "User associated with the token not found");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid Tokens");
    }
});
