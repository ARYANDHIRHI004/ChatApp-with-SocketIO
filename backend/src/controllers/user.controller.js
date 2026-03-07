import { User } from "../models/users.models.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadFileToCloudinary from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (user) => {
    try {
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error);
        
        throw new ApiError(500, "Something went wrong while generating access and refresh token")

    }
}

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

    const avatarLocalPath = req.files?.avatar[0]?.path;

    
    const avatar = await uploadFileToCloudinary(avatarLocalPath);
    console.log(avatar)

    

    const user = await User.create({
        username,
        email,
        fullname,
        password,
        avatar: {
            url: avatar.url
        }

    });


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    return res.status(200).json(
        new ApiResponse(200, "User created successfully", createdUser)
    );


})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });


    if (!user) {
        throw new ApiError(401, "User not found.")
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid Credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);

    const loggedInUser = await User.findById(user._id).select("-password -resfreshToken")

    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

    return res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(200, "User logged in successfully", loggedInUser)
        )


})

export const logoutUser = asyncHandler(async (req, res) => {
    const user = req.user._id

    await User.findByIdAndUpdate(user, { refreshToken: null })

    return res.status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(
        new ApiResponse(200, "User logged out successfully")
    )
})

export const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user._id

    const currentUser = await User.findById(user)

    if(!currentUser){
        throw new ApiError(401, "User not found")
    }

    return res.status(200).json(
        new ApiResponse(200, "User found successfully", currentUser)
    )
})

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password -refreshToken")

    return res.status(200).json(
        new ApiResponse(200, "Users found successfully", users)
    )
})