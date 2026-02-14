import { Router } from "express";

const userRouter = Router();

userRouter.route("/register-user").post(registerUser)

export default userRouter