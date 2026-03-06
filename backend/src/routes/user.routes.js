import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { getCurrentUser, loginUser, logoutUser, registerUSer } from "../controllers/user.controller.js";

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
userRouter.route("/current-user").post(getCurrentUser)


export default userRouter