import express from "express"
import { loginUser, passwordreset, registerUser } from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/sendpasswordlink",passwordreset)



export default userRouter;