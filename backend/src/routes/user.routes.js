import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";

const userRouter = Router();

userRouter.route("/register-user").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser)

export default userRouter