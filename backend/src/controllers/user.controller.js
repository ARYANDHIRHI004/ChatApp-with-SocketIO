import { User } from "../models/users.models.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const registerUSer = asyncHandler(async (req, res) => {

    const { username, email, fullname, password } = req.body;

    if (!username || !email || !fullname || !password) {
        throw new ApiError(402, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { password }]
    })

    if (existedUser) {
        throw new ApiError(401, "User already exist")
    }

    const user = await User.create({
        username,
        email,
        fullname,
        password

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    return res.status(200).json(
        new ApiResponse(200, "User created successfully", createdUser)
    )


})