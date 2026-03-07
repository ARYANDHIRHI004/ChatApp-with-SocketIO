import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { getAllUsers, getCurrentUser, loginUser, logoutUser, registerUSer } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const userRouter = Router();

userRouter.route("/register-user").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUSer)

userRouter.route("/login-user").post(loginUser)
userRouter.route("/logout-user").post(logoutUser)
userRouter.route("/current-user").get(verifyJWT, getCurrentUser)
userRouter.route("/get-all-users").get(verifyJWT, getAllUsers)



export default userRouter