import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema, userSchema } from "../schemas/auth.schemas.js";
import { postSignIn, postSignUp } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(userSchema), postSignUp);
authRouter.post("/signin", validateSchema(loginSchema), postSignIn);

export default authRouter;