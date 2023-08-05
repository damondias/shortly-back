import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/auth.schemas.js";
import { postSignUp } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(userSchema), postSignUp);

export default authRouter;