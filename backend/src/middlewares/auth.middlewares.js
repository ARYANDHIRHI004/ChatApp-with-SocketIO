import { env } from "../constent.js"
import ApiError from "../utils/apiError.js"
import jwt, { decode } from "jsonwebtoken"

// authentication Middleware
const verifyJWT = async (req, _, next) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            throw new ApiError(401, "Invalid Token");
        }

        const decodedToken = jwt.verify(token, env.ACCESS_TOKEN_SECRET_KEY);

        if (!decodedToken) {
            throw new ApiError(401, "Invalid Token");
        }

        req.user = decodedToken;

        next();
    } catch (error) {
        console.log("auth middleware", error)
    }

}

export {
    verifyJWT
}
